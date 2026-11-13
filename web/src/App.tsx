import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { Brand } from "./components/TopBar";
import { ensureAccount, isAdmin, watchAccount, type Account } from "./lib/account";
import { useActivityHeartbeat } from "./lib/activity";
import { isReviewDeckId } from "./lib/reviewDecks";
import { auth } from "./lib/firebase";
import { acceptTerms, takePendingAcceptance, TERMS_VERSION } from "./lib/terms";
import type { AppUser } from "./lib/types";
import Admin from "./pages/Admin";
import CreateDeck from "./pages/CreateDeck";
import Dashboard from "./pages/Dashboard";
import DeckReview from "./pages/DeckReview";
import Engagement from "./pages/Engagement";
import Instagram from "./pages/Instagram";
import Landing from "./pages/Landing";
import LessonPage from "./pages/Lesson";
import Login from "./pages/Login";
import Practice from "./pages/Practice";
import PracticeSetup from "./pages/PracticeSetup";
import PublicLinks from "./pages/PublicLinks";
import PublicTest from "./pages/PublicTest";
import Results from "./pages/Results";
import Season from "./pages/Season";
import Study from "./pages/Study";
import Terms, { TermsText } from "./pages/Terms";
import ReviewDeck from "./pages/ReviewDeck";
import Upgrade from "./pages/Upgrade";

/** Review decks share the /decks/:id address with other decks, so practice and results links work for both. */
function DeckPage() {
  const { deckId = "" } = useParams();
  return isReviewDeckId(deckId) ? <ReviewDeck key={deckId} /> : <DeckReview />;
}

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

/** Shown until the signed-in person has accepted the current Terms of Use (new Google sign-ups, older accounts, new versions). */
function AcceptTerms({ uid, updated }: { uid: string; updated: boolean }) {
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="wrap">
      <div className="stack" style={{ paddingTop: "6vh" }}>
        <Brand />
        <h1>{updated ? "We've updated our Terms of Use." : "Before you start, please review our Terms of Use."}</h1>
        <p className="muted">You need to accept the Terms of Use and Disclaimer to use EASprint.</p>
        <div className="panel terms-box" tabIndex={0} aria-label="Terms of Use and Disclaimer">
          <TermsText />
        </div>
        <label className="agree" htmlFor="accept-terms">
          <input id="accept-terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span>
            I am 18 or older, and I have read and agree to the Terms of Use and Disclaimer. I understand EASprint is not affiliated with the IRS, is for study
            only and is not tax or legal advice, and does not guarantee exam results.
          </span>
        </label>
        <div className="row">
          <button
            className="btn-primary"
            disabled={!agreed || busy}
            onClick={async () => {
              setBusy(true);
              setError("");
              try {
                await acceptTerms(uid);
              } catch {
                setError("That didn't save. Try again in a moment.");
                setBusy(false);
              }
            }}
          >
            Agree and continue
          </button>
          <button onClick={() => auth && signOut(auth)}>Decline and sign out</button>
        </div>
        {error && <p className="error">{error}</p>}
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
    ensureAccount(user, takePendingAcceptance())
      .catch(() => undefined)
      .finally(() => (stop = watchAccount(user.uid, setAccount)));
    return () => stop();
  }, [user]);
  useActivityHeartbeat(!!auth && !!user && account?.status !== "suspended");

  if (user === undefined) {
    return (
      <div className="wrap">
        <span className="spinner" />
      </div>
    );
  }
  if (!user) {
    // Signed out: the marketing page at "/", and sign-in everywhere else, so a link to /upgrade lands there after signing in.
    return (
      <Routes>
        <Route path="/" element={<Landing signedIn={false} />} />
        <Route path="/how-it-works" element={<Landing signedIn={false} />} />
        <Route path="/signup" element={<Login key="signup" initialMode="signup" />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/t/:token" element={<PublicTest signedIn={false} />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }
  const admin = !!auth && isAdmin(user);
  if (account?.status === "suspended" && !admin) return <Suspended />;
  if (account && account.termsVersion !== TERMS_VERSION) {
    return (
      <Routes>
        <Route path="/terms" element={<Terms />} />
        <Route path="/t/:token" element={<PublicTest signedIn />} />
        <Route path="*" element={<AcceptTerms uid={user.uid} updated={!!account.termsVersion} />} />
      </Routes>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <AccountContext.Provider value={{ account, admin }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/how-it-works" element={<Landing signedIn />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/t/:token" element={<PublicTest signedIn />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
          <Route path="/create" element={<CreateDeck />} />
          <Route path="/decks/:deckId" element={<DeckPage />} />
          <Route path="/decks/:deckId/practice" element={<PracticeSetup />} />
          <Route path="/sessions/:sessionId" element={<Practice />} />
          <Route path="/sessions/:sessionId/results" element={<Results />} />
          <Route path="/study" element={<Study />} />
          {(["part1", "part2", "part3"] as const).map((p) => (
            <Route key={p} path={`/study/${p}`} element={<Season part={p} />} />
          ))}
          <Route path="/study/:lessonId" element={<LessonPage />} />
          {auth && <Route path="/upgrade" element={<Upgrade />} />}
          {admin && <Route path="/admin" element={<Admin />} />}
          {admin && <Route path="/admin/engagement" element={<Engagement />} />}
          {admin && <Route path="/admin/instagram" element={<Instagram />} />}
          {admin && <Route path="/admin/public-links" element={<PublicLinks />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AccountContext.Provider>
    </UserContext.Provider>
  );
}
