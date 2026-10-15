import { PointerEvent, ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  max?: number;
}

// Pointer-driven 3D tilt with a moving glare. Children can use `.pop` to float above the card.
export function TiltCard({ children, className = "", max = 9 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${-(py - 0.5) * max * 2}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </div>
  );
}
