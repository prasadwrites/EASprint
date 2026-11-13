import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Brand, Chip, Icon } from "../components/TopBar";
import { DECKS } from "../data";
import { EXAM } from "../data/exam";
import { PLANS, PRO_MONTHLY_PRICE, type PlanId } from "../lib/account";
import { auth } from "../lib/firebase";
import { formatClock } from "../lib/pace";
import { episodes } from "../study";
import { Face } from "../study/cast";
import { ComicPanels } from "../study/Comic";
import marriage from "../study/lessons/marriage";
import { SEASONS, STUDY_OUTLINE } from "../study/outline";
import type { PartId } from "../lib/types";

const total = DECKS.reduce((a, d) => a + d.questionCount, 0);

/** An example of the home page's "Practice next" list. The numbers are made up for the picture. */
const EXAMPLE_WEAK = [
  { name: "Representation before the IRS", pct: 40 },
  { name: "Business Entities and Considerations", pct: 55 },
  { name: "Deductions and Credits", pct: 67 },
];

/** The promo videos on YouTube: a wide one for desktop and a Short for phones. */
const VIDEOS = {
  wide: { id: "19dLUhNjEfo", watch: "https://youtu.be/19dLUhNjEfo", poster: "https://i.ytimg.com/vi/19dLUhNjEfo/maxresdefault.jpg" },
  tall: { id: "J8W-OEop5Zg", watch: "https://youtube.com/shorts/J8W-OEop5Zg", poster: "https://i.ytimg.com/vi/J8W-OEop5Zg/hqdefault.jpg" },
};
const PHONE = "(max-width: 640px)";

function usePhone() {
  const [phone, setPhone] = useState(() => window.matchMedia(PHONE).matches);
  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const on = () => setPhone(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return phone;
}

/** Shows the video's poster with a play button, and loads YouTube's player (with fullscreen) only when clicked. */
function PromoVideo() {
  const phone = usePhone();
  const v = phone ? VIDEOS.tall : VIDEOS.wide;
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <section className="promo" aria-labelledby="promo-title">
      <div className="stack" style={{ gap: 6, alignItems: "center", textAlign: "center" }}>
        <span className="eyebrow">Watch</span>
        <h2 id="promo-title" style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>
          Then see how EASprint finds and fixes your weak spots
        </h2>
      </div>
      <div className={`promo-frame ${phone ? "tall" : "wide"}`}>
        {playing === v.id ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`}
            title="EASprint promo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button type="button" className="promo-poster" aria-label="Play the EASprint video" onClick={() => setPlaying(v.id)}>
            <img
              src={v.poster}
              alt=""
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.includes("hqdefault")) img.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
              }}
            />
            <span className="promo-play">
              <Icon name="play" size={34} />
            </span>
          </button>
        )}
      </div>
      <a className="btn" href={v.watch} target="_blank" rel="noopener noreferrer">
        Watch on YouTube
      </a>
    </section>
  );
}

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

/** Sources for the claims in "The old way". Keep the wording on the page no stronger than these support. */
const FORGETTING_SOURCE = "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0120644";

const PART_IDS: PartId[] = ["part1", "part2", "part3"];

/** The sample episode on the page: Season 1, Episode 1.2, its first rule card and its first Ace vs. Hoot case. */
const SAMPLE = marriage;
const SAMPLE_CARD = SAMPLE.cards[0];
const SAMPLE_CASE = SAMPLE.cases[0];

function SampleCase() {
  const [pick, setPick] = useState<string | null>(null);
  const c = SAMPLE_CASE;
  const right = pick === c.answer;
  return (
    <article className="panel stack" style={{ gap: 12 }} aria-labelledby="case-h">
      <div className="row" style={{ gap: 12 }}>
        <Face who={c.who} size={52} />
        <div className="stack" style={{ gap: 0 }}>
          <span className="eyebrow">Ace vs. Hoot · Case file</span>
          <h3 id="case-h">{c.title}</h3>
        </div>
      </div>
      <p>{c.facts}</p>
      <p>
        <b>{c.question}</b>
      </p>
      <div className="stack" style={{ gap: 8 }} role="group" aria-label="Answer choices">
        {c.choices.map((ch) => (
          <button
            key={ch}
            type="button"
            className={`btn pitch-choice${pick && ch === c.answer ? " is-right" : ""}${pick === ch && ch !== c.answer ? " is-wrong" : ""}`}
            aria-pressed={pick === ch}
            onClick={() => setPick(ch)}
          >
            {ch}
          </button>
        ))}
      </div>
      {pick && (
        <p className={`pitch-verdict ${right ? "good" : "bad"}`} aria-live="polite">
          <b>{right ? "Ace wins this one. " : "Hoot wins this one. "}</b>
          {c.why}
        </p>
      )}
    </article>
  );
}

/**
 * The public pitch page: EA exam prep told as a comic sitcom (Ledger Falls), with real exam-style practice behind it.
 * Signed-out visitors see it at "/", and anyone can open it at /how-it-works.
 */
export default function Landing({ signedIn }: { signedIn: boolean }) {
  const start = signedIn || !auth ? { to: "/", label: "Go to my practice" } : { to: "/signup", label: "Create a free account" };
  const plansLink = auth ? "/upgrade" : null;
  const aired = PART_IDS.map((p) => ({ part: p, season: SEASONS[p], count: episodes(p).length, total: STUDY_OUTLINE[p].reduce((n, d) => n + d.topics.length, 0) }));
  const episodeCount = aired.reduce((n, s) => n + s.count, 0);
  const price = PRO_MONTHLY_PRICE ? `${PRO_MONTHLY_PRICE} a month` : null;

  return (
    <>
      <header className="appbar">
        <div className="appbar-inner">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Brand />
          </Link>
          <nav className="nav" aria-label="Page">
            <a href="#episode">Watch an episode</a>
            <a href="#why">Why it works</a>
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
            <span className="eyebrow">Enrolled Agent exam prep, told as a comic sitcom</span>
            <h1>Pass the EA exam one comic episode at a time.</h1>
            <p className="lead">
              Every exam topic in EASprint is an episode of <b>Ledger Falls</b>, a sitcom about Penny Pocket, her enrolled agent Ace and Hoot, the IRS examiner
              owl. Read an episode on your phone in a few minutes, then prove you've got it on real exam-style questions.
            </p>
            <div className="row">
              <a className="btn btn-primary btn-big" href="#episode">
                <Icon name="play" /> Read a free episode
              </a>
              <Link className="btn btn-big" to={start.to}>
                {start.label}
              </Link>
            </div>
            <p className="muted" style={{ fontSize: 14 }}>
              The first EA exam prep we know of that teaches the whole syllabus as a comic sitcom. {episodeCount} episodes out now, written to tax law
              through {EXAM.taxLawThrough}.
            </p>
          </div>

          <figure className="hero-card hero-comic" aria-label={`A panel from Ledger Falls, Episode ${SAMPLE.number}`}>
            <ComicPanels panels={SAMPLE.comic.slice(1, 2)} />
            <figcaption className="muted" style={{ fontSize: 13 }}>
              Ledger Falls, Episode {SAMPLE.number}: “{SAMPLE.episode}”
            </figcaption>
          </figure>
        </section>

        <section className="stack" id="old-way" style={{ gap: 20 }}>
          <div className="stack" style={{ gap: 6 }}>
            <span className="eyebrow">The old way</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>Hundreds of dollars for hours of lectures you'll mostly forget</h2>
          </div>
          <div className="steps-grid">
            <article className="panel stack pitch-pain" style={{ gap: 8 }}>
              <span className="pitch-big">$500+</span>
              <h3>What a full review course can cost</h3>
              <p className="muted">The big-name EA review packages for all three parts often cost $500 or more, before you've paid a single exam fee.</p>
            </article>
            <article className="panel stack pitch-pain" style={{ gap: 8 }}>
              <span className="pitch-big">Hours</span>
              <h3>Of lectures and dense text</h3>
              <p className="muted">Long recorded lectures and hundreds of pages of tax-code prose, much of it more detail than the exam ever asks about.</p>
            </article>
            <article className="panel stack pitch-pain" style={{ gap: 8 }}>
              <span className="pitch-big">Days</span>
              <h3>Until most of it fades</h3>
              <p className="muted">
                Memory research going back to Ebbinghaus shows we forget much of what we learn within days unless we come back to it and use it.{" "}
                <a href={FORGETTING_SOURCE} target="_blank" rel="noopener noreferrer">
                  See the study
                </a>
                .
              </p>
            </article>
          </div>
        </section>

        <section className="stack" id="episode" style={{ gap: 20 }}>
          <div className="stack" style={{ gap: 6 }}>
            <span className="eyebrow">
              Watch an episode · Season {SEASONS[SAMPLE.part].number} · Episode {SAMPLE.number}
            </span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>“{SAMPLE.episode}”</h2>
            <p className="muted" style={{ maxWidth: 720 }}>
              This is a real episode from the app, on filing status. Penny and Milo get married at 11:59 PM on New Year's Eve. Is that one minute or a whole
              year of marriage to the IRS?
            </p>
          </div>
          <ComicPanels panels={SAMPLE.comic} />

          <div className="steps-grid">
            <article className="panel stack" style={{ gap: 10, borderLeft: "4px solid var(--accent)" }}>
              <span className="eyebrow">The rule behind the joke</span>
              <h3>{SAMPLE_CARD.title}</h3>
              <p>{SAMPLE_CARD.keyPoint}</p>
              <p className="muted" style={{ fontSize: 14 }}>
                Each episode follows its comic with picture cards for the rules, the exam traps, and links to the IRS publications behind them.
              </p>
            </article>
            <SampleCase />
          </div>
        </section>

        <section className="stack" id="why" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 6 }}>
            <span className="eyebrow">Why it works</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>Learning that's fun, focused and always in your pocket</h2>
          </div>
          <div className="steps-grid">
            <article className="panel">
              <Step n={1} title="Every topic is an episode">
                <p className="muted">
                  Each exam part is a season, and each topic is an episode with the same cast. You remember the rule because you remember what happened to Penny.
                </p>
              </Step>
            </article>
            <article className="panel">
              <Step n={2} title="Real exam questions, on any topic you choose">
                <p className="muted">
                  Every episode ends in exam-style questions. Want more on one rule? Type it, for example “head of household”, and Claude builds you a deck of
                  exam-style questions on just that.
                </p>
              </Step>
            </article>
            <article className="panel">
              <Step n={3} title="Only what the exam tests">
                <p className="muted">
                  Episodes follow the official exam content outline for each part, so your time goes to the rules that score points, not to tax trivia.
                </p>
              </Step>
            </article>
            <article className="panel">
              <Step n={4} title="Look it up when you need it">
                <p className="muted">
                  Nobody memorizes the whole tax code, and working EAs look things up every day. Every episode keeps its rule cards, your own notes and the IRS
                  source one tap away, whenever you want them again.
                </p>
              </Step>
            </article>
            <article className="panel">
              <Step n={5} title="Study anywhere, on your phone">
                <p className="muted">Episodes are made for a phone screen. Read one on the bus or in a lunch break, and pick up where you left off.</p>
              </Step>
            </article>
            <article className="panel">
              <Step n={6} title={price ? `${price}: less than a meal` : "Costs less than a meal a month"}>
                <p className="muted">
                  {price ? `Pro is ${price}` : "Pro is a small monthly fee"}, with no $500 course to buy up front.
                </p>
              </Step>
            </article>
          </div>
        </section>

        <section className="stack" id="seasons" style={{ gap: 20 }}>
          <div className="stack" style={{ gap: 6 }}>
            <span className="eyebrow">The seasons</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>One season for each part of the exam</h2>
          </div>
          <div className="decks" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {aired.map(({ part, season, count, total: topics }) => (
              <article key={part} className="panel stack" style={{ gap: 8 }}>
                <span className="eyebrow">
                  Season {season.number} · Part {season.number}
                </span>
                <h3>{season.name}</h3>
                <p className="muted">{season.blurb}</p>
                <Chip tone={count >= topics ? "good" : count ? "warn" : undefined}>
                  {count >= topics ? `All ${count} episodes out` : count ? `${count} of ${topics} episodes out` : "Coming soon"}
                </Chip>
              </article>
            ))}
          </div>
        </section>

        <PromoVideo />

        <section className="stack" id="how" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 6 }}>
            <span className="eyebrow">Practice</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>Find your weak topics. Drill them until they're not.</h2>
            <p className="muted" style={{ maxWidth: 720 }}>
              Alongside the episodes, {total} built-in exam-style questions track which domains are costing you points and send you straight back to them.
            </p>
          </div>

          <div className="steps-grid">
            <article className="panel stack hero-card" aria-label="Example of the Practice next list">
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
              <p className="muted" style={{ fontSize: 13 }}>
                An example. Yours fills in from your own results, weakest first.
              </p>
            </article>
            <article className="panel">
              <ul className="checklist" style={{ gap: 8 }}>
                <Point>Every question is tagged with its exam domain, and your home page keeps your three weakest domains at the top.</Point>
                <Point>Retry just the ones you missed, or practice the ones you haven't seen yet.</Point>
                <Point>See why the right answer is right and why each wrong option is wrong, with a link to the IRS source.</Point>
                <Point>
                  Start in <b>Learn</b> mode with no clock, then move up to <b>Exam pace</b> at {formatClock(EXAM.secondsPerQuestion)} per question.
                </Point>
              </ul>
            </article>
          </div>
        </section>

        <section className="stack" id="covered">
          <div className="stack" style={{ gap: 6 }}>
            <span className="eyebrow">What's covered</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>All three parts of the Special Enrollment Examination</h2>
            <p className="muted" style={{ maxWidth: 720 }}>
              Organized by the domains in the IRS content outlines. The number next to each domain is how many scored questions it has on the real exam.
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
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>Start free. Unlock Ledger Falls for less than a meal a month.</h2>
              <p className="muted" style={{ maxWidth: 720 }}>
                Free gets you practice questions for all three exam parts with every explanation, plus the first unit of Ledger Falls Season 1. Pro and Pro Max add every Ledger Falls episode in all three seasons, your study notes, and
                more decks built with Claude.{price ? ` Pro is ${price}.` : ""}
              </p>
            </div>
            <div className="tiles" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {(Object.keys(PLANS) as PlanId[]).map((p) => (
                <article key={p} className="panel stack" style={{ gap: 12, borderColor: p === "pro" ? "var(--accent)" : undefined, borderWidth: p === "pro" ? 2 : undefined }}>
                  <h3 style={{ fontSize: 20 }}>
                    {PLANS[p].name}
                    {p === "pro" && price && <span className="muted" style={{ fontSize: 15, fontWeight: 600 }}> · {price}</span>}
                  </h3>
                  <ul className="checklist" style={{ gap: 8 }}>
                    {p !== "free" ? (
                      <Point>
                        <b>Every Ledger Falls episode</b> and your notes
                      </Point>
                    ) : (
                      <Point>
                        <b>Ledger Falls Season 1, Unit 1</b> and your notes
                      </Point>
                    )}
                    <Point>
                      <b>{PLANS[p].maxDecks}</b> decks built with Claude
                    </Point>
                    <Point>
                      Up to <b>{PLANS[p].maxQuestions}</b> questions per deck
                    </Point>
                    <Point>Practice questions for all three exam parts</Point>
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
          <h2>Your next study session can be the next episode.</h2>
          <Link className="btn btn-primary btn-big" to={start.to}>
            <Icon name="play" /> {start.label}
          </Link>
        </section>

        <p className="note">
          EASprint is a study aid and is not affiliated with the IRS. Ledger Falls and its characters are fictional. Check the linked IRS source before relying
          on any figure, because amounts change from year to year. See our <Link to="/terms">Terms of Use and Disclaimer</Link>.
        </p>
      </main>
    </>
  );
}
