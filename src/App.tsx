import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Credentials } from "./components/Credentials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FaceDef, Prism } from "./components/Prism";
import projects from "./data/projects.json";

const isProjectsRoute = () => window.location.hash.startsWith("#/projects");

const faces: FaceDef[] = [
  { id: "home", label: "Home", aura: "#34d399", node: <Hero projectCount={projects.length} /> },
  { id: "experience", label: "Experience", aura: "#38bdf8", node: <Experience /> },
  { id: "skills", label: "Skills", aura: "#fb7185", node: <Skills /> },
  { id: "projects", label: "Work", aura: "#fbbf24", node: <Projects projects={projects.slice(0, 6)} /> },
  { id: "credentials", label: "Credentials", aura: "#a78bfa", node: <Credentials /> },
  { id: "contact", label: "Contact", aura: "#34d399", node: <><Contact /><Footer /></> },
];

export default function App() {
  const [allProjects, setAllProjects] = useState(isProjectsRoute());

  useEffect(() => {
    const sync = () => {
      setAllProjects(isProjectsRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  if (allProjects) {
    return (
      <div className="all-page">
        <Header />
        <main id="main" style={{ paddingTop: 64 }}>
          <Projects projects={projects} all />
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Prism faces={faces} /></main>
    </>
  );
}
