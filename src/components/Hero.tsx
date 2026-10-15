import { useEffect, useState } from "react";
import { profile } from "../data/profile";

function useRotating(items: readonly string[], ms = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), ms);
    return () => clearInterval(t);
  }, [items, ms]);
  return items[i];
}

export function Hero({ projectCount }: { projectCount: number }) {
  const role = useRotating(profile.roles);
  return (
    <section className="hero container" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="dot" /> Open to Full-Stack &amp; Front-End roles</p>
        <h1>
          Hi, I'm {profile.name}.<br />
          <span className="accent" key={role}>{role}</span>
        </h1>
        <p className="lead">{profile.summary}</p>
        <div className="actions">
          <a className="btn" href="#projects">View my work</a>
          <a className="btn btn-ghost" href={profile.links.cv} download="Vedang_Shelatkar_CV.pdf">Download CV</a>
        </div>
        <dl className="stats">
          {[{ value: String(projectCount), label: "Projects shipped" }, ...profile.stats].map((s) => (
            <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
          ))}
        </dl>
      </div>
      <div className="hero-photo">
        <img src="Assets/profile.png" alt="Portrait of Vedang Shelatkar" width={420} height={420} />
      </div>
    </section>
  );
}
