import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAccount } from "../App";
import TopBar, { Chip } from "../components/TopBar";
import { domainName } from "../data";
import { PARTS } from "../data/exam";
import { CAST, Face, type CastMember } from "../study/cast";
import { SEASONS, STUDY_OUTLINE } from "../study/outline";
import { audioUrl, canPlayPodcast, clock, lineAt, podcastFor, SHOWS, transcriptUrl, type Transcript } from "../study/podcasts";

const SPEEDS = [1, 1.25, 1.5, 2];
const FACES = new Set<string>(["Penny", "Ace", "Hoot", "Milo", "Lulu", "Dee", "Biscuit", "Walt", "Rosa"]);

/** One unit podcast (Ledger Falls Unplugged or The Hot Seat), with a transcript that follows the audio. */
export default function PodcastPage() {
  const { id = "" } = useParams();
  const pc = podcastFor(id);
  const { account, admin } = useAccount();
  const audio = useRef<HTMLAudioElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [failed, setFailed] = useState(false);
  const [now, setNow] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [follow, setFollow] = useState(true);
  const open = !!pc && canPlayPodcast(pc, account, admin);

  useEffect(() => {
    if (!pc || !open) return;
    let live = true;
    fetch(transcriptUrl(pc))
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((t: Transcript) => live && setTranscript(t))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [pc, open]);

  const lines = transcript?.lines ?? [];
  const current = lineAt(lines, now);

  useEffect(() => {
    if (!follow || current < 0) return;
    const el = list.current?.children[current] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [current, follow]);

  if (!pc) return <Navigate to="/study" replace />;

  const part = PARTS.find((x) => x.id === pc.part)!;
  const season = SEASONS[pc.part];
  const unit = STUDY_OUTLINE[pc.part].findIndex((d) => d.id === pc.domainId) + 1;
  const names = pc.cast.map((c) => CAST.find((m) => m.short === c)?.name ?? c);
  const show = SHOWS[pc.show];
  const hotseat = pc.show === "hotseat";
  const questions = lines.filter((l) => l.q).length;

  const seek = (t: number) => {
    const a = audio.current;
    if (!a) return;
    a.currentTime = t;
    void a.play().catch(() => undefined);
  };
  const setRate = (r: number) => {
    setSpeed(r);
    if (audio.current) audio.current.playbackRate = r;
  };

  return (
    <>
      <TopBar back={{ to: `/study/${pc.part}`, label: `Season ${season.number}` }} />
      <main className="page podcast-page">
        <header className="stack" style={{ gap: 8 }}>
          <span className="eyebrow">
            {show.name} · Season {season.number}, Unit {unit} · {part.short}
          </span>
          <h1>{pc.title}</h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 680 }}>
            {pc.blurb}
          </p>
          <div className="row" style={{ gap: 8 }}>
            <Chip>
              {show.icon} {pc.minutes} min
            </Chip>
            {hotseat && questions > 0 && <Chip>{questions} exam-style questions</Chip>}
            <Chip>{domainName(pc.domainId)}</Chip>
            <span className="row podcast-faces" aria-label={`With ${names.join(", ")}`}>
              {pc.cast.map((c) => (
                <Face key={c} who={c} size={34} />
              ))}
            </span>
          </div>
        </header>

        {!open ? (
          <div className="panel stack locked">
            <h2>This podcast is on Pro</h2>
            <p>
              The Season 1, Unit 1 podcasts are free to play in full. Every other unit's podcasts, Ledger Falls Unplugged and The Hot Seat quiz show, each with a transcript to read along, come with the Pro and Pro
              Max plans.
            </p>
            <div className="row">
              <Link className="btn btn-primary" to="/upgrade">
                See plans
              </Link>
              <Link className="btn" to={hotseat ? "/study/podcast/p1d1-hotseat" : "/study/podcast/p1d1"}>
                Play the free episode
              </Link>
            </div>
          </div>
        ) : (
          <>
            <section className="panel stack podcast-player" aria-label="Player">
              <audio ref={audio} src={audioUrl(pc)} controls preload="metadata" onTimeUpdate={(e) => setNow(e.currentTarget.currentTime)} onRateChange={(e) => setSpeed(e.currentTarget.playbackRate)} />
              <div className="row spread" style={{ gap: 8 }}>
                <div className="row" role="group" aria-label="Playback speed" style={{ gap: 6 }}>
                  {SPEEDS.map((r) => (
                    <button key={r} type="button" className={`btn btn-small${speed === r ? " btn-primary" : ""}`} aria-pressed={speed === r} onClick={() => setRate(r)}>
                      {r}×
                    </button>
                  ))}
                </div>
                <label className="row" style={{ gap: 6, fontSize: 14 }}>
                  <input type="checkbox" checked={follow} onChange={(e) => setFollow(e.target.checked)} />
                  Follow along
                </label>
              </div>
            </section>
            <p className="muted" style={{ fontSize: 13 }}>
              Cast voices are computer-generated. The comedy is fiction; the tax rules are the same ones the unit's episodes teach. Tap any line to jump to it.
              {hotseat && " Memory tricks and exam tips are highlighted, and each question is numbered so you can pause and answer it yourself."}
            </p>

            <section className="stack" aria-labelledby="transcript-h">
              <h2 id="transcript-h">Transcript</h2>
              {failed && <p className="muted">The transcript didn't load. The audio still plays above.</p>}
              {!transcript && !failed && <p className="muted">Loading the transcript…</p>}
              <ol ref={list} className="transcript">
                {lines.map((l, i) => {
                  const cls = `tline${i === current ? " now" : ""}${l.cue ? " cue" : ""}${l.stage ? " stage" : ""}${l.q ? " question" : ""}${l.tip ? " tip" : ""}`;
                  if (l.cue || l.stage)
                    return (
                      <li key={i} className={cls}>
                        <button type="button" onClick={() => seek(l.t)}>
                          <span className="mono tline-time">{clock(l.t)}</span>
                          {l.q ? <strong className="tline-q">❓ Question {l.q}</strong> : <em>{l.cue ? `♪ ${l.cue}` : l.stage}</em>}
                        </button>
                      </li>
                    );
                  const face = l.who && FACES.has(l.who) ? (l.who as CastMember) : undefined;
                  return (
                    <li key={i} className={cls}>
                      <button type="button" onClick={() => seek(l.t)} aria-current={i === current ? "true" : undefined}>
                        <span className="mono tline-time">{clock(l.t)}</span>
                        {face ? <Face who={face} size={30} /> : <span className="tline-noface" aria-hidden>🎙️</span>}
                        <span>
                          <strong className={`tline-who who-${(l.who ?? "").toLowerCase().split(/[ ,]/)[0]}`}>{l.who}</strong> {l.tip && <span className="tline-tip">💡</span>}
                          {l.text}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>
          </>
        )}
      </main>
    </>
  );
}
