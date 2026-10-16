import { useState } from "react";
import { featured } from "../data/profile";

export interface Project {
  name: string;
  description: string;
  link: string;
}

const kinds = ["All", "Web", "Mobile"] as const;
type Kind = (typeof kinds)[number];
const kindOf = (p: Project): Exclude<Kind, "All"> => (/android|flutter|kotlin/i.test(`${p.name} ${p.description}`) ? "Mobile" : "Web");

function ProjectCard({ p }: { p: Project }) {
  const source = p.link.includes("github.com");
  return (
    <article className="card">
      <p className="tag">{source ? "Source code" : "Live demo"}</p>
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <a className="link" href={p.link} target="_blank" rel="noopener noreferrer">
        {source ? "View on GitHub" : "Open project"} <span aria-hidden>↗</span>
      </a>
    </article>
  );
}

export function Projects({ projects, all = false }: { projects: Project[]; all?: boolean }) {
  const [kind, setKind] = useState<Kind>("All");
  const [q, setQ] = useState("");
  const shown = projects.filter((p) => (kind === "All" || kindOf(p) === kind) && `${p.name} ${p.description}`.toLowerCase().includes(q.trim().toLowerCase()));
  const list = !all && kind === "All" && !q ? shown.slice(0, 6) : shown;
  return (
    <section className="section container" id="projects">
      <div className="section-head">
        <h2>{all ? "All projects" : "Selected work"}</h2>
        {all ? <a className="link" href="#">← Back home</a> : <a className="link" href="#/projects">View all projects →</a>}
      </div>

      {!all && (
        <div className="grid-3 featured">
          {featured.map((f) => (
            <article className="card feat" key={f.title}>
              <p className="tag">{f.tag}</p>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      )}

      <div className="toolbar">
        <div className="tabs" role="group" aria-label="Filter projects">
          {kinds.map((k) => <button key={k} className="tab" aria-pressed={kind === k} onClick={() => setKind(k)}>{k}</button>)}
        </div>
        <label className="search"><span className="sr">Search projects</span><input type="search" placeholder="Search projects…" value={q} onChange={(e) => setQ(e.target.value)} /></label>
      </div>

      {projects.length === 0 ? (
        <p className="lead">No projects available at the moment.</p>
      ) : shown.length === 0 ? (
        <p className="lead" role="status">No projects match. <button className="link linkbtn" onClick={() => { setKind("All"); setQ(""); }}>Clear filters</button></p>
      ) : (
        <div className="grid-3">{list.map((p) => <ProjectCard key={p.link} p={p} />)}</div>
      )}
    </section>
  );
}
