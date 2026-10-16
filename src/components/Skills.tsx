import { useState } from "react";
import { skillGroups } from "../data/profile";

export function Skills() {
  const [active, setActive] = useState(0);
  const g = skillGroups[active];
  return (
    <section className="section band" id="skills">
      <div className="container">
        <h2>Skills</h2>
        <p className="lead">Pick a category to see what I work with day to day.</p>
        <div className="tabs" role="tablist" aria-label="Skill categories">
          {skillGroups.map((x, i) => (
            <button key={x.group} role="tab" id={`tab-${i}`} aria-selected={i === active} aria-controls="skill-panel" className="tab" onClick={() => setActive(i)}>{x.group}</button>
          ))}
        </div>
        <div className="chips" role="tabpanel" id="skill-panel" aria-labelledby={`tab-${active}`} key={active}>
          {g.items.map((i) => <span className="chip" key={i}>{i}</span>)}
        </div>
      </div>
    </section>
  );
}
