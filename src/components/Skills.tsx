import { skillGroups } from "../data/profile";
import { Reveal } from "./Reveal";
import { SkillSphere } from "./SkillSphere";
import { TiltCard } from "./TiltCard";

export function Skills() {
  return (
    <section className="section container" id="skills">
      <Reveal><h2 className="section-title"><small>02 /</small> Skills</h2></Reveal>
      <div className="skills-layout">
        <Reveal><SkillSphere /></Reveal>
        <div className="skill-groups">
          {skillGroups.map((g, i) => (
            <Reveal key={g.group} delay={i * 80}>
              <TiltCard className="glass" max={6}>
                <h3 className="sub">{g.group}</h3>
                <ul className="chips">{g.items.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
