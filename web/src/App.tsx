import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./lib/firebase";
import type { AppUser } from "./lib/types";
import Dashboard from "./pages/Dashboard";
import DeckReview from "./pages/DeckReview";
import Login from "./pages/Login";
import Practice from "./pages/Practice";
import PracticeSetup from "./pages/PracticeSetup";
import Results from "./pages/Results";

/** Stands in for a signed-in user when Firebase is not configured. */
const LOCAL_USER: AppUser = { uid: "local", displayName: null, email: null };

const UserContext = createContext<AppUser | null>(null);
export const useUser = () => useContext(UserContext)!;

export default function App() {
  const [user, setUser] = useState<AppUser | null | undefined>(auth ? undefined : LOCAL_USER);
  useEffect(() => (auth ? onAuthStateChanged(auth, setUser) : undefined), []);

  if (user === undefined) {
    return (
      <div className="wrap">
        <span className="spinner" />
      </div>
    );
  }
  if (!user) return <Login />;

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/decks/:deckId" element={<DeckReview />} />
        <Route path="/decks/:deckId/practice" element={<PracticeSetup />} />
        <Route path="/sessions/:sessionId" element={<Practice />} />
        <Route path="/sessions/:sessionId/results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserContext.Provider>
  );
}
