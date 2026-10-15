import { featured } from "../data/profile";
import { ProjectRing } from "./ProjectRing";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

export interface Project {
  name: string;
  description: string;
  link: string;
}

function ProjectCard({ p }: { p: Project }) {
  const source = p.link.includes("github.com");
  return (
    <TiltCard className="glass project" max={7}>
      <span className="chip">{source ? "Source code" : "Live demo"}</span>
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <a className="link" href={p.link} target="_blank" rel="noopener noreferrer">
        {source ? "View on GitHub" : "Open project"} <span aria-hidden>↗</span>
      </a>
    </TiltCard>
  );
}

export function Projects({ projects, all = false }: { projects: Project[]; all?: boolean }) {
  return (
    <section className="section container" id="projects">
      <Reveal>
        <div className="section-head">
          <h2 className="section-title"><small>{all ? "" : "03 /"}</small> {all ? "All projects" : "Work"}</h2>
          {all ? <a className="link" href="#home">← Back home</a> : <a className="link" href="#/projects">View all projects →</a>}
        </div>
      </Reveal>

      {!all && (
        <div className="featured">
          {featured.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <TiltCard className="glass featured-card" max={8}>
                <span className="chip">{f.tag}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      )}

      {projects.length === 0 ? (
        <p className="lead">No projects available at the moment.</p>
      ) : all ? (
        <div className="project-grid">{projects.map((p) => <Reveal key={p.link}><ProjectCard p={p} /></Reveal>)}</div>
      ) : (
        <Reveal><ProjectRing projects={projects} /></Reveal>
      )}
    </section>
  );
}
