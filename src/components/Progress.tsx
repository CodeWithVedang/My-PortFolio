import { useEffect, useState } from "react";

// scroll progress bar + back-to-top button
export function Progress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setP(max > 0 ? scrollY / max : 0);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  const show = p > 0.15;
  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${p})` }} aria-hidden />
      <button className={`to-top${show ? " show" : ""}`} aria-label="Back to top" tabIndex={show ? 0 : -1} onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
    </>
  );
}
