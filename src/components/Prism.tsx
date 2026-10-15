import { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from "react";

export interface FaceDef {
  id: string;
  label: string;
  aura: string;
  node: ReactNode;
}

const idOf = (faces: FaceDef[], hash: string) => Math.max(0, faces.findIndex((f) => f.id === hash.replace("#", "")));
const MOVE_MS = 1200;

function Face({ index, count, active, shown, def, onNext }: { index: number; count: number; active: boolean; shown: boolean; def: FaceDef; onNext?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const step = 360 / count;
  // R = half of the face width / tan(half of the face angle), so neighbouring faces meet edge to edge.
  const radius = `calc(50vw / ${Math.tan(Math.PI / count).toFixed(4)})`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.toggleAttribute("inert", !active);
    if (active) el.scrollTop = 0;
  }, [active]);

  return (
    <div
      ref={ref}
      className={`face ${active ? "active" : ""}`}
      data-n={String(index + 1).padStart(2, "0")}
      aria-hidden={!active}
      style={{ transform: `rotateY(${index * step}deg) translateZ(${radius})`, visibility: shown ? "visible" : "hidden", "--aura": def.aura } as CSSProperties}
    >
      {def.node}
      {onNext && (
        <div className="face-next">
          <button className="btn btn-ghost" onClick={onNext}>Next: {def.label} →</button>
        </div>
      )}
      <span className="face-no" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

// Full-screen hexagonal prism: navigation rotates the whole site in 3D instead of scrolling.
export function Prism({ faces }: { faces: FaceDef[] }) {
  const n = faces.length;
  const step = 360 / n;
  const [turn, setTurn] = useState(() => idOf(faces, window.location.hash));
  const [moving, setMoving] = useState(false);
  const active = ((turn % n) + n) % n;
  const timer = useRef<number>();

  const goTo = useCallback(
    (target: number) => {
      setTurn((t) => {
        const cur = ((t % n) + n) % n;
        let d = target - cur;
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        return t + d;
      });
      setMoving(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMoving(false), MOVE_MS);
      history.replaceState(null, "", `#${faces[target].id}`);
      window.dispatchEvent(new CustomEvent("face", { detail: faces[target].id }));
    },
    [faces, n],
  );
  const go = useCallback((d: number) => goTo((((active + d) % n) + n) % n), [active, goTo, n]);

  useEffect(() => {
    // Section links anywhere on the page rotate the prism instead of scrolling.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href")?.slice(1);
      const i = faces.findIndex((f) => f.id === id);
      if (a && i >= 0) {
        e.preventDefault();
        goTo(i);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as Element).closest("input, textarea, [role=group]")) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const onHash = () => goTo(idOf(faces, window.location.hash));
    let start: { x: number; y: number; ok: boolean } | null = null;
    const onDown = (e: PointerEvent) => (start = { x: e.clientX, y: e.clientY, ok: !(e.target as Element).closest("[data-nodrag], input, textarea") });
    const onUp = (e: PointerEvent) => {
      if (!start?.ok) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 2) go(dx < 0 ? 1 : -1);
      start = null;
    };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [faces, go, goTo]);

  const radius = `calc(50vw / ${Math.tan(Math.PI / n).toFixed(4)})`;
  const prev = faces[(active - 1 + n) % n];
  const next = faces[(active + 1) % n];
  return (
    <>
      <div className="stage">
        <div className="prism" style={{ transform: `translateZ(calc(${radius} * -1)) rotateY(${-turn * step}deg)` }}>
          {faces.map((f, i) => (
            <Face key={f.id} index={i} count={n} active={i === active} shown={moving || i === active} def={f} onNext={i === active && i < n - 1 ? () => go(1) : undefined} />
          ))}
        </div>
        <button className="edge prev" onClick={() => go(-1)} aria-label={`Previous: ${prev.label}`}>← <span>{prev.label}</span></button>
        <button className="edge next" onClick={() => go(1)} aria-label={`Next: ${next.label}`}><span>{next.label}</span> →</button>
        <div className="dots" role="group" aria-label="Sections">
          {faces.map((f, i) => (
            <button key={f.id} aria-label={f.label} aria-current={i === active} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </>
  );
}
