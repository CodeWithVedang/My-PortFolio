import { experience } from "../data/profile";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

export function Experience() {
  return (
    <section className="section container" id="experience">
      <Reveal><h2 className="section-title"><small>01 /</small> Experience</h2></Reveal>
      <ol className="stack">
        {experience.map((r, i) => (
          <li key={r.when}>
            <Reveal delay={i * 90}>
              <TiltCard className="glass role-card" max={5}>
                <div className="role-head">
                  <div>
                    <h3>{r.title}</h3>
                    <p className="org">{r.org}</p>
                  </div>
                  <div className="role-meta">
                    <time>{r.when}</time>
                    <span className="chip">{r.kind}</span>
                  </div>
                </div>
                <ul className="list">{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
