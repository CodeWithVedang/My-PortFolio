import { achievements, courses, profile, timeline } from "../data/profile";

export function About() {
  return (
    <section className="section container" id="about">
      <h2 className="section-title">About</h2>
      <div className="about-grid">
        <div>
          <p className="lead">
            Based in {profile.location}. I turn rough ideas into clean, fast interfaces, and automate the boring parts
            behind them with Python, RPA and GitHub Actions.
          </p>
          <h3 className="sub">Achievements</h3>
          <ul className="list">{achievements.map((a) => <li key={a}>{a}</li>)}</ul>
          <h3 className="sub">Courses</h3>
          <ul className="list">{courses.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <ol className="timeline">
          {timeline.map((t) => (
            <li key={t.title}>
              <time>{t.when}</time>
              <h3>{t.title}</h3>
              <p>{t.where}</p>
              <span className="chip">{t.note}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
