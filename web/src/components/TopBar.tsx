import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAccount, useUser } from "../App";
import { limitsFor } from "../lib/account";
import { canBuildDecks } from "../lib/decks";
import { auth } from "../lib/firebase";

export function Brand({ small }: { small?: boolean }) {
  return (
    <div className="brand" style={small ? { fontSize: 19 } : undefined}>
      EA<span>Sprint</span>
    </div>
  );
}

export function Icon({ name, size = 18 }: { name: "back" | "play" | "check" | "next" | "clock"; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true } as const;
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (name) {
    case "back":
      return <svg {...common} {...stroke}><path d="M15 18l-6-6 6-6" /></svg>;
    case "play":
      return <svg {...common} fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>;
    case "check":
      return <svg {...common} {...stroke} strokeWidth={3}><path d="M5 12l5 5 9-11" /></svg>;
    case "next":
      return <svg {...common} {...stroke} strokeWidth={2.5}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "clock":
      return <svg {...common} {...stroke}><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9 2h6" /></svg>;
  }
}

function ProfileMenu() {
  const user = useUser();
  const { account, admin } = useAccount();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  // Without Firebase there is no account: progress stays in this browser.
  if (!auth) return <span className="chip">Saved on this device</span>;
  const signedIn = auth;
  const initial = (user.displayName || user.email || "?").trim()[0]?.toUpperCase();
  return (
    <div ref={ref}>
      <button className="avatar" aria-label="Profile and settings" aria-expanded={open} onClick={() => setOpen(!open)}>
        {initial}
      </button>
      {open && (
        <div className="menu" role="menu">
          <div className="who">
            {user.displayName || user.email}
            <br />
            {admin ? "Admin" : `${limitsFor(account, false).name} plan`}
          </div>
          {!admin && account?.plan !== "promax" && (
            <Link className="btn" role="menuitem" to="/upgrade" style={{ justifyContent: "flex-start", border: "none" }}>
              Upgrade plan
            </Link>
          )}
          {admin && (
            <Link className="btn" role="menuitem" to="/admin" style={{ justifyContent: "flex-start", border: "none" }}>
              Manage accounts
            </Link>
          )}
          <button role="menuitem" onClick={() => signOut(signedIn)}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

/** Home gets the main navigation; inner pages get a back link. */
export default function TopBar({ back }: { back?: { to: string; label: string } }) {
  const { admin } = useAccount();
  const { pathname, hash } = useLocation();
  const current = (h: string) => (pathname === "/" && hash === h ? "page" : undefined);
  return (
    <header className="appbar">
      <div className="appbar-inner">
        {back ? (
          <>
            <Link className="back" to={back.to}>
              <Icon name="back" /> {back.label}
            </Link>
            <div style={{ flexGrow: 1 }} />
            <Brand small />
          </>
        ) : (
          <>
            <Brand />
            <nav className="nav" aria-label="Main">
              <Link to="/" aria-current={current("")}>Home</Link>
              <Link to="/#parts" aria-current={current("#parts")}>Exam parts</Link>
              {canBuildDecks && <Link to="/#decks" aria-current={current("#decks")}>My decks</Link>}
              <Link to="/#progress" aria-current={current("#progress")}>Progress</Link>
              {admin && <Link to="/admin">Accounts</Link>}
            </nav>
            <ProfileMenu />
          </>
        )}
      </div>
    </header>
  );
}

export function Chip({ tone, children }: { tone?: "good" | "warn" | "bad" | "neutral" | "miss"; children: React.ReactNode }) {
  const style = tone === "miss" ? { background: "var(--miss-soft)", color: "var(--miss-ink)" } : undefined;
  return (
    <span className={`chip ${tone && tone !== "neutral" && tone !== "miss" ? tone : ""}`} style={style}>
      {children}
    </span>
  );
}
