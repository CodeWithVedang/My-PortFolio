import { skills } from "../data/profile";

export function Skills() {
  return (
    <section className="section container" id="skills">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {skills.map((g) => (
          <div className="card" key={g.group}>
            <h3 className="sub">{g.group}</h3>
            <ul className="skill-list">
              {g.items.map((s) => (
                <li key={s.name}>
                  <img src={s.logo} alt="" width={20} height={20} loading="lazy" />
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
