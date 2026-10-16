import { journey, StepKind } from "../data/profile";

const label: Record<StepKind, string> = { work: "Work", intern: "Internship", edu: "Education", milestone: "Milestone" };

export function Journey() {
  return (
    <section className="section container" id="journey">
      <h2>My journey</h2>
      <p className="lead">From computer science student to full-time developer: internships, degrees and milestones, newest first.</p>
      <ol className="journey">
        {journey.map((s) => (
          <li key={s.title} className={`step ${s.kind}`}>
            <span className="dot" aria-hidden />
            <div className="step-card">
              <div className="step-top">
                <span className="badge">{label[s.kind]}</span>
                <span className="meta">{s.when}</span>
              </div>
              <h3>{s.title}</h3>
              <p className="org">{s.org}{s.note ? ` · ${s.note}` : ""}</p>
              {s.points && <ul className="list">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
