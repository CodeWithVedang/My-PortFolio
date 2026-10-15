import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";
import { TiltCard } from "./TiltCard";

function useRotating(items: readonly string[], ms = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), ms);
    return () => clearInterval(t);
  }, [items, ms]);
  return items[i];
}

const LAYERS = 8;

// Name rendered as stacked layers so it reads as extruded 3D text that follows the pointer.
function Extruded({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--ry", `${(e.clientX / window.innerWidth - 0.5) * 24}deg`);
      el.style.setProperty("--rx", `${-(e.clientY / window.innerHeight - 0.5) * 16}deg`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <h1 className="extruded" ref={ref} aria-label={text}>
      {Array.from({ length: LAYERS }, (_, i) => (
        <span key={i} aria-hidden className="layer" style={{ transform: `translateZ(${-i * 4}px)`, opacity: 1 - i * 0.1 }}>
          {text}
        </span>
      ))}
      <span aria-hidden className="layer front">{text}</span>
    </h1>
  );
}

const CODE = [
  ["kw", "import"], ["", " { test, expect } "], ["kw", "from"], ["str", " '@playwright/test'"], ["", ";"],
] as const;

export function Hero({ projectCount }: { projectCount: number }) {
  const role = useRotating(profile.roles);
  const stats = [{ value: String(projectCount), label: "Projects shipped" }, ...profile.stats];
  return (
    <section className="hero container" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="dot" /> {profile.status}</p>
        <Extruded text={profile.name} />
        <p className="role" aria-live="off"><span key={role}>{role}</span></p>
        <p className="lead">{profile.summary}</p>
        <div className="actions">
          <a className="btn" href={profile.links.resume} download="Vedang_Shelatkar_Resume.pdf">Download resume</a>
          <a className="btn btn-ghost" href="#contact">Hire me</a>
          <a className="btn btn-ghost" href="#projects">See my work</a>
        </div>
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
          ))}
        </dl>
      </div>

      <TiltCard className="hero-card" max={12}>
        <div className="code-window pop">
          <div className="code-bar"><i /><i /><i /><span>release.spec.ts</span></div>
          <pre aria-label="Sample Playwright test">
            <code>
              <span className="line">{CODE.map(([c, t], i) => <span key={i} className={c}>{t}</span>)}</span>
              <span className="line"> </span>
              <span className="line"><span className="kw">test</span>(<span className="str">'ship it with confidence'</span>, <span className="kw">async</span> ({"{ page }"}) {"=> {"}</span>
              <span className="line">{"  "}<span className="kw">await</span> page.<span className="fn">goto</span>(<span className="str">'codewithvedang.vercel.app'</span>);</span>
              <span className="line">{"  "}<span className="kw">await</span> <span className="fn">expect</span>(page).<span className="fn">toHaveTitle</span>(<span className="str">/Vedang/</span>);</span>
              <span className="line">{"  "}<span className="cm">// UI + API, mocked network, zero flake</span></span>
              <span className="line">{"});"}<span className="caret" /></span>
            </code>
          </pre>
        </div>
        <img className="avatar pop2" src="img/profile.jpg" alt="Portrait of Vedang Shelatkar" width={150} height={150} />
        <span className="float f1 pop3">TypeScript</span>
        <span className="float f2 pop3">Playwright</span>
        <span className="float f3 pop3">React</span>
      </TiltCard>
    </section>
  );
}
