import { profile } from "../data/profile";
import { CountUp } from "./CountUp";

export function Hero({ projectCount }: { projectCount: number }) {
  return (
    <section className="hero-wrap">
      <div className="hero container">
      <div className="hero-text">
        <p className="eyebrow">{profile.status}</p>
        <h1>{profile.name}<br /><span>Software Developer</span></h1>
        <p className="lead">{profile.summary}</p>
        <ul className="stats">
          {profile.stats.map((x) => <li key={x.label}><strong><CountUp value={x.value} /></strong><span>{x.label}</span></li>)}
        </ul>
        <div className="actions">
          <a className="btn" href="#projects">See my work ({projectCount}+ projects)</a>
          <a className="btn btn-ghost" href={profile.links.resume} download="Vedang_Shelatkar_Resume.pdf">Download resume</a>
        </div>
        <p className="social">
          <a className="link" href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="link" href={`mailto:${profile.email}`}>Email</a>
        </p>
      </div>
      <div className="avatar"><img src="img/profile.jpg" width={320} height={320} alt="Portrait of Vedang Shelatkar" fetchPriority="high" /></div>
      </div>
    </section>
  );
}
