import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Brand } from "../components/TopBar";
import { auth as maybeAuth, googleProvider } from "../lib/firebase";
import { markTermsAccepted } from "../lib/terms";

export default function Login({ initialMode = "signin" }: { initialMode?: "signin" | "signup" }) {
  // Only shown when Firebase is configured.
  const auth = maybeAuth!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const signup = mode === "signup";
  // Creating an account needs the Terms box ticked first. Google sign-in can also create an account, so on
  // the sign-up form it waits for the box too; anyone who gets an account another way is asked on arrival.
  const needsAgreement = signup && !agreed;

  const run = async (fn: () => Promise<unknown>) => {
    setError("");
    if (needsAgreement) {
      setError("Please read and agree to the Terms of Use to create an account.");
      return;
    }
    if (signup) markTermsAccepted();
    try {
      await fn();
    } catch (e) {
      const code = (e as { code?: string }).code ?? "";
      setError(
        code.includes("invalid-credential") || code.includes("wrong-password")
          ? "That email and password don't match. Check them and try again."
          : code.includes("email-already-in-use")
            ? "An account already uses this email. Sign in instead."
            : code.includes("weak-password")
              ? "Use a password of at least 6 characters."
              : "Sign-in didn't work. Try again in a moment.",
      );
    }
  };

  return (
    <div className="wrap" style={{ maxWidth: 440 }}>
      <div className="stack" style={{ paddingTop: "10vh" }}>
        <Brand />
        <h1>Timed practice for the Enrolled Agent exam.</h1>
        <p className="muted">Practice all three parts of the SEE against the clock, with every answer explained and tied to its IRS source.</p>
        {signup && (
          <label className="agree panel" htmlFor="agree-terms">
            <input id="agree-terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
            <span>
              I am 18 or older, and I have read and agree to the{" "}
              <Link to="/terms" target="_blank" rel="noopener">
                Terms of Use and Disclaimer
              </Link>
              . I understand EASprint is not affiliated with the IRS, is for study only and is not tax or legal advice, and does not guarantee exam results.
            </span>
          </label>
        )}
        <button className="btn-primary btn-big" disabled={needsAgreement} onClick={() => run(() => signInWithPopup(auth, googleProvider))}>
          Continue with Google
        </button>
        <form
          className="panel stack"
          onSubmit={(e) => {
            e.preventDefault();
            run(() =>
              mode === "signin"
                ? signInWithEmailAndPassword(auth, email, password)
                : createUserWithEmailAndPassword(auth, email, password),
            );
          }}
        >
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full rounded-[10px] border border-line bg-bg px-3 py-2.5"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={needsAgreement}>{mode === "signin" ? "Sign in with email" : "Create account"}</button>
          <button type="button" className="btn-link" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
            {mode === "signin" ? "New here? Create an account" : "Have an account? Sign in"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        {!signup && (
          <p className="muted" style={{ fontSize: 14 }}>
            By continuing, you agree to the <Link to="/terms">Terms of Use and Disclaimer</Link>.
          </p>
        )}
        <Link to="/how-it-works">See how EASprint works</Link>
      </div>
    </div>
  );
}
