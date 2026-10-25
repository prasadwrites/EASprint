import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Brand } from "./components/TopBar";
import { ensureAccount, isAdmin, watchAccount, type Account } from "./lib/account";
import { auth } from "./lib/firebase";
import type { AppUser } from "./lib/types";
import Admin from "./pages/Admin";
import CreateDeck from "./pages/CreateDeck";
import Dashboard from "./pages/Dashboard";
import DeckReview from "./pages/DeckReview";
import Login from "./pages/Login";
import Practice from "./pages/Practice";
import PracticeSetup from "./pages/PracticeSetup";
import Results from "./pages/Results";
import Upgrade from "./pages/Upgrade";

/** Stands in for a signed-in user when Firebase is not configured. */
const LOCAL_USER: AppUser = { uid: "local", displayName: null, email: null };

const UserContext = createContext<AppUser | null>(null);
export const useUser = () => useContext(UserContext)!;

interface AccountState {
  account: Account | null;
  admin: boolean;
}
const AccountContext = createContext<AccountState>({ account: null, admin: false });
/** The signed-in person's account: plan, limits and status. Null without Firebase. */
export const useAccount = () => useContext(AccountContext);

function Suspended() {
  return (
    <div className="wrap" style={{ maxWidth: 480 }}>
      <div className="stack" style={{ paddingTop: "10vh" }}>
        <Brand />
        <h1>Your account is suspended.</h1>
        <p className="muted">Contact the person who runs EASprint if you think this is a mistake.</p>
        <div>
          <button onClick={() => auth && signOut(auth)}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<AppUser | null | undefined>(auth ? undefined : LOCAL_USER);
  const [account, setAccount] = useState<Account | null>(null);
  useEffect(() => (auth ? onAuthStateChanged(auth, (u) => setUser(u ? { uid: u.uid, displayName: u.displayName, email: u.email, emailVerified: u.emailVerified } : null)) : undefined), []);

  useEffect(() => {
    if (!auth || !user) return;
    let stop = () => undefined as void;
    ensureAccount(user)
      .catch(() => undefined)
      .finally(() => (stop = watchAccount(user.uid, setAccount)));
    return () => stop();
  }, [user]);

  if (user === undefined) {
    return (
      <div className="wrap">
        <span className="spinner" />
      </div>
    );
  }
  if (!user) return <Login />;
  const admin = !!auth && isAdmin(user);
  if (account?.status === "suspended" && !admin) return <Suspended />;

  return (
    <UserContext.Provider value={user}>
      <AccountContext.Provider value={{ account, admin }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateDeck />} />
          <Route path="/decks/:deckId" element={<DeckReview />} />
          <Route path="/decks/:deckId/practice" element={<PracticeSetup />} />
          <Route path="/sessions/:sessionId" element={<Practice />} />
          <Route path="/sessions/:sessionId/results" element={<Results />} />
          {auth && <Route path="/upgrade" element={<Upgrade />} />}
          {admin && <Route path="/admin" element={<Admin />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AccountContext.Provider>
    </UserContext.Provider>
  );
}
