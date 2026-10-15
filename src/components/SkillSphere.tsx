import { PointerEvent, useEffect, useRef } from "react";
import { skills } from "../data/profile";

const GOLDEN = 137.508;

// Draggable CSS-3D globe. Logos sit on a Fibonacci sphere and face outward.
export function SkillSphere() {
  const globe = useRef<HTMLDivElement>(null);
  const rot = useRef({ x: -12, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => {
      if (!drag.current && !reduced) rot.current.y += 0.25;
      if (globe.current) globe.current.style.transform = `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  const down = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    rot.current.y += (e.clientX - drag.current.x) * 0.45;
    rot.current.x = Math.max(-70, Math.min(70, rot.current.x - (e.clientY - drag.current.y) * 0.45));
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const up = () => (drag.current = null);

  const n = skills.length;
  return (
    <div className="sphere-stage" data-nodrag onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      <div className="sphere" ref={globe} role="list" aria-label="Skills globe">
        {skills.map((s, i) => {
          const lat = (Math.asin(1 - (2 * (i + 0.5)) / n) * 180) / Math.PI;
          const lon = i * GOLDEN;
          return (
            <div key={s.name} role="listitem" className="sphere-item" style={{ transform: `rotateY(${lon}deg) rotateX(${lat}deg) translateZ(var(--r))` }}>
              <img src={s.logo} alt="" width={34} height={34} draggable={false} loading="lazy" />
              <span>{s.name}</span>
            </div>
          );
        })}
      </div>
      <p className="hint">Drag to spin</p>
    </div>
  );
}
