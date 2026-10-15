import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import projects from "./data/projects.json";

const isProjectsRoute = () => window.location.hash.startsWith("#/projects");

export default function App() {
  const [allProjects, setAllProjects] = useState(isProjectsRoute());

  useEffect(() => {
    const sync = () => {
      const projectsRoute = isProjectsRoute();
      setAllProjects(projectsRoute);
      if (projectsRoute) return window.scrollTo(0, 0);
      const id = window.location.hash.slice(1);
      // wait for the home sections to mount before scrolling
      requestAnimationFrame(() => (id ? document.getElementById(id)?.scrollIntoView() : window.scrollTo(0, 0)));
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        {allProjects ? (
          <Projects projects={projects} all />
        ) : (
          <>
            <Hero projectCount={projects.length} />
            <About />
            <Skills />
            <Projects projects={projects.slice(0, 3)} />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
