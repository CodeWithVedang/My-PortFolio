import { useEffect, useRef, useState } from "react";

// animates the leading number of "20+", "8.52", "2×" once it scrolls into view
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const m = /^([\d.]+)(.*)$/.exec(value);
    if (!m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const end = parseFloat(m[1]);
    const decimals = m[1].split(".")[1]?.length ?? 0;
    setText(`${(0).toFixed(decimals)}${m[2]}`);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min((t - t0) / 1000, 1);
        setText(`${(end * (1 - Math.pow(1 - k, 3))).toFixed(decimals)}${m[2]}`);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);

  return <span ref={ref}>{text}</span>;
}
