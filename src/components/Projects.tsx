export interface Project {
  name: string;
  description: string;
  link: string;
}

function ProjectCard({ p }: { p: Project }) {
  const source = p.link.includes("github.com");
  return (
    <article className="card project">
      <span className="chip">{source ? "Source code" : "Live demo"}</span>
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <a className="link" href={p.link} target="_blank" rel="noopener noreferrer">
        {source ? "View on GitHub" : "Open project"} <span aria-hidden>↗</span>
      </a>
    </article>
  );
}

export function Projects({ projects, all = false }: { projects: Project[]; all?: boolean }) {
  return (
    <section className="section container" id="projects">
      <div className="section-head">
        <h2 className="section-title">{all ? "All projects" : "Latest projects"}</h2>
        {all ? <a className="link" href="#home">← Back home</a> : <a className="link" href="#/projects">View all →</a>}
      </div>
      {projects.length === 0 ? (
        <p className="lead">No projects available at the moment.</p>
      ) : (
        <div className="project-grid">{projects.map((p) => <ProjectCard key={p.link} p={p} />)}</div>
      )}
    </section>
  );
}
