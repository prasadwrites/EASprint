import { Link } from "react-router-dom";
import { Brand, Chip, Icon } from "../components/TopBar";
import { DECKS } from "../data";
import { EXAM } from "../data/exam";
import { PLANS, type PlanId } from "../lib/account";
import { auth } from "../lib/firebase";
import { formatClock } from "../lib/pace";

const total = DECKS.reduce((a, d) => a + d.questionCount, 0);

/** An example of the home page's "Practice next" list. The numbers are made up for the picture. */
const EXAMPLE_WEAK = [
  { name: "Representation before the IRS", pct: 40 },
  { name: "Business Entities and Considerations", pct: 55 },
  { name: "Deductions and Credits", pct: 67 },
];

const tone = (pct: number) => (pct >= 80 ? "good" : pct >= 60 ? "warn" : "bad");

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="stack" style={{ gap: 10 }}>
      <div className="row" style={{ gap: 10 }}>
        <span className="step-n">{n}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Point({ children }: { children: React.ReactNode }) {
  return (
    <li className="done">
      <span className="dot">
        <Icon name="check" size={14} />
      </span>
      <span style={{ color: "var(--ink)" }}>{children}</span>
    </li>
  );
}

/**
 * The public page: how a candidate finds their weak exam domains, drills them and builds up to exam pace.
 * Signed-out visitors see it at "/", and anyone can open it at /how-it-works.
 */
export default function Landing({ signedIn }: { signedIn: boolean }) {
  const start = signedIn || !auth ? { to: "/", label: "Go to my practice" } : { to: "/signup", label: "Create a free account" };
  const plansLink = auth ? "/upgrade" : null;

  return (
    <>
      <header className="appbar">
        <div className="appbar-inner">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Brand />
          </Link>
          <nav className="nav" aria-label="Page">
            <a href="#how">How it works</a>
            <a href="#covered">What's covered</a>
            {plansLink && <a href="#plans">Plans</a>}
          </nav>
          {!signedIn && auth ? (
            <div className="row" style={{ gap: 8 }}>
              <Link className="btn" to="/login">
                Sign in
              </Link>
              <Link className="btn btn-primary" to="/signup">
                Sign up free
              </Link>
            </div>
          ) : (
            <Link className="btn btn-primary" to="/">
              My practice
            </Link>
          )}
        </div>
      </header>

      <main className="page landing">
        <section className="hero">
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow">Enrolled Agent exam prep · Parts 1, 2 and 3</span>
            <h1>Find the topics you're weak in. Drill them until they're not.</h1>
            <p className="lead">
              EASprint shows you which exam domains are costing you points, sends you straight into practice on just those domains, and explains every
              answer down to the IRS source, so each session builds on the last.
            </p>
            <div className="row">
              <Link className="btn btn-primary btn-big" to={start.to}>
                <Icon name="play" /> {start.label}
              </Link>
              {plansLink && (
                <Link className="btn btn-big" to={plansLink}>
                  See plans
                </Link>
              )}
            </div>
            <p className="muted" style={{ fontSize: 14 }}>
              {total} built-in questions across all three parts, written to tax law through {EXAM.taxLawThrough} for the {EXAM.window} testing window.
            </p>
          </div>

          <figure className="panel stack hero-card" aria-label="Example of the Practice next list">
            <div className="row spread">
              <h3>Practice next</h3>
              <Chip>From your sessions</Chip>
            </div>
            <ul className="weak-demo">
              {EXAMPLE_WEAK.map((w) => (
                <li key={w.name}>
                  <span>{w.name}</span>
                  <div className="bar">
                    <i style={{ width: `${w.pct}%`, background: `var(--${tone(w.pct)})` }} />
                  </div>
                  <b style={{ color: `var(--${tone(w.pct)})` }}>{w.pct}%</b>
                </li>
              ))}
            </ul>
            <figcaption className="muted" style={{ fontSize: 13 }}>
              An example. Yours fills in from your own results, weakest first.
            </figcaption>
          </figure>
        </section>

        <section className="stack" id="how" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 6 }}>
            <span className="eyebrow">How it works</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>Find, drill, repeat</h2>
            <p className="muted" style={{ maxWidth: 720 }}>
              Reading every publication cover to cover is slow. EASprint uses your own answers to point your study time at the domains where it pays off.
            </p>
          </div>

          <div className="steps-grid">
            <article className="panel">
              <Step n={1} title="Find your weak topics">
                <p className="muted">Every question is tagged with its IRS exam domain, so your results tell you more than a score.</p>
                <ul className="checklist" style={{ gap: 8 }}>
                  <Point>Your results show the time you spent on each question against the target, and which domain took the most time and how many questions in it you missed.</Point>
                  <Point>
                    Your home page keeps a <b>Practice next</b> list of your three weakest domains across all your sessions, with your accuracy in each.
                  </Point>
                  <Point>Your best score for each part, overall accuracy and practice time sit alongside it.</Point>
                </ul>
              </Step>
            </article>

            <article className="panel">
              <Step n={2} title="Drill into them">
                <p className="muted">One tap takes you from a weak domain to practice on just that domain.</p>
                <ul className="checklist" style={{ gap: 8 }}>
                  <Point>From your results, retry just the questions you missed, or get more questions on the domain you missed most.</Point>
                  <Point>Filter any part to the domains you choose.</Point>
                  <Point>
                    Practice <b>the ones you got wrong last time</b>, <b>the ones you haven't practiced</b>, a random set, or the exam outline order.
                  </Point>
                  <Point>
                    Need more on one rule? Describe it, for example "Head of household rules", and Claude builds you a deck of exam-style questions on it.
                  </Point>
                </ul>
              </Step>
            </article>

            <article className="panel">
              <Step n={3} title="Build up your knowledge">
                <p className="muted">Every answer teaches, whether you got it right or not.</p>
                <ul className="checklist" style={{ gap: 8 }}>
                  <Point>See why the right answer is right and why each wrong option is wrong.</Point>
                  <Point>Read the rule, how it applies to the facts, and an exam tip, with a link to the IRS source it comes from.</Point>
                  <Point>
                    Start in <b>Learn</b> mode with no clock, then move up to <b>Exam pace</b> at {formatClock(EXAM.secondsPerQuestion)} per question and track
                    your pace against the target.
                  </Point>
                </ul>
              </Step>
            </article>
          </div>

          <div className="panel loop">
            <p>
              <b>The loop:</b> take a set, check your results, drill the domain at the top of your Practice next list, then retry the ones you missed. Once your
              accuracy in a domain reaches 80%, it drops off the list and the next one moves up.
            </p>
          </div>
        </section>

        <section className="stack" id="covered">
          <div className="stack" style={{ gap: 6 }}>
            <span className="eyebrow">What's covered</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>All three parts of the Special Enrollment Examination</h2>
            <p className="muted" style={{ maxWidth: 720 }}>
              Questions are organized by the domains in the IRS content outlines. The number next to each domain is how many scored questions it has on the
              real exam, so you can see where the points are.
            </p>
          </div>
          <div className="decks" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {DECKS.map((d) => (
              <article key={d.id} className="panel deck-card">
                <div>
                  <h3>{d.title}</h3>
                  <div className="meta">
                    {d.questionCount} practice questions · {d.domains.length} domains
                  </div>
                </div>
                <ul className="domain-list">
                  {d.domains.map((x) => (
                    <li key={x.id}>
                      <span>{x.name}</span>
                      <span className="mono muted">{x.examQuestions}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {plansLink && (
          <section className="stack" id="plans">
            <div className="stack" style={{ gap: 6 }}>
              <span className="eyebrow">Plans</span>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>Start free. Upgrade when you want more decks.</h2>
              <p className="muted" style={{ maxWidth: 720 }}>
                Every plan includes all three built-in parts, every explanation and your progress tracking. Paid plans let you build more decks with Claude,
                and bigger ones.
              </p>
            </div>
            <div className="tiles" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {(Object.keys(PLANS) as PlanId[]).map((p) => (
                <article key={p} className="panel stack" style={{ gap: 12, borderColor: p === "pro" ? "var(--accent)" : undefined, borderWidth: p === "pro" ? 2 : undefined }}>
                  <h3 style={{ fontSize: 20 }}>{PLANS[p].name}</h3>
                  <ul className="checklist" style={{ gap: 8 }}>
                    <Point>
                      <b>{PLANS[p].maxDecks}</b> decks built with Claude
                    </Point>
                    <Point>
                      Up to <b>{PLANS[p].maxQuestions}</b> questions per deck
                    </Point>
                    <Point>All three built-in exam parts</Point>
                  </ul>
                </article>
              ))}
            </div>
            <div className="row">
              <Link className="btn btn-primary btn-big" to={signedIn ? "/upgrade" : "/signup"}>
                {signedIn ? "Upgrade my plan" : "Start on Free"}
              </Link>
              <Link className="btn btn-big" to="/upgrade">
                Compare and upgrade
              </Link>
            </div>
          </section>
        )}

        <section className="panel cta">
          <h2>Your next study session can start with your weakest topic.</h2>
          <Link className="btn btn-primary btn-big" to={start.to}>
            <Icon name="play" /> {start.label}
          </Link>
        </section>

        <p className="note">
          EASprint is a study aid and is not affiliated with the IRS. Check the linked IRS source before relying on any figure, because amounts change from year to
          year.
        </p>
      </main>
    </>
  );
}
