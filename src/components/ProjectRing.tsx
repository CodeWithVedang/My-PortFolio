import { KeyboardEvent, useEffect, useState } from "react";
import type { Project } from "./Projects";

const CARD_W = 300;

// 3D carousel: cards sit on a cylinder, the ring rotates to bring one to the front.
export function ProjectRing({ projects }: { projects: Project[] }) {
  const n = projects.length;
  const step = 360 / n;
  const radius = Math.round(CARD_W / 2 / Math.tan(Math.PI / n)) + 24;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((i) => i + 1), 4200);
    return () => clearInterval(t);
  }, [paused, n]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") setIdx((i) => i + 1);
    if (e.key === "ArrowLeft") setIdx((i) => i - 1);
  };

  const front = ((idx % n) + n) % n;
  return (
    <div
      className="ring-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onKeyDown={onKey}
      role="group"
      aria-roledescription="carousel"
      aria-label="Latest projects"
    >
      <div className="ring" style={{ transform: `translateZ(-${radius}px) rotateY(${-idx * step}deg)` }}>
        {projects.map((p, i) => {
          const active = i === front;
          const source = p.link.includes("github.com");
          return (
            <article
              key={p.link}
              className={`ring-card ${active ? "active" : ""}`}
              style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
              aria-hidden={!active}
            >
              <span className="chip">{source ? "Source code" : "Live demo"}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <a className="link" href={p.link} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1}>
                {source ? "View on GitHub" : "Open project"} <span aria-hidden>↗</span>
              </a>
            </article>
          );
        })}
      </div>
      <div className="ring-ctl">
        <button className="btn btn-ghost btn-sm" onClick={() => setIdx(idx - 1)} aria-label="Previous project">←</button>
        <span className="muted">{front + 1} / {n}</span>
        <button className="btn btn-ghost btn-sm" onClick={() => setIdx(idx + 1)} aria-label="Next project">→</button>
      </div>
    </div>
  );
}
