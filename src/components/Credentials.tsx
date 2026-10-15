import { achievements, certificates, education } from "../data/profile";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

export function Credentials() {
  return (
    <section className="section container" id="credentials">
      <Reveal><h2 className="section-title"><small>04 /</small> Credentials</h2></Reveal>
      <div className="cred-grid">
        <Reveal>
          <TiltCard className="glass" max={5}>
            <h3 className="sub">Education</h3>
            <ul className="plain">
              {education.map((e) => (
                <li key={e.title}>
                  <div className="row"><strong>{e.title}</strong><span className="chip">{e.score}</span></div>
                  <p className="muted">{e.where} · {e.when}</p>
                </li>
              ))}
            </ul>
          </TiltCard>
        </Reveal>
        <Reveal delay={90}>
          <TiltCard className="glass" max={5}>
            <h3 className="sub">Achievements</h3>
            <ul className="list">{achievements.map((a) => <li key={a}>{a}</li>)}</ul>
          </TiltCard>
        </Reveal>
        <Reveal delay={180}>
          <TiltCard className="glass" max={5}>
            <h3 className="sub">Certificates</h3>
            <ul className="list">{certificates.map((c) => <li key={c}>{c}</li>)}</ul>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
