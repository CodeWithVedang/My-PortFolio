import { Suspense, lazy, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Credentials } from "./components/Credentials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import projects from "./data/projects.json";

// three.js is code-split so the page paints before the 3D scene loads.
const Scene = lazy(() => import("./three/Scene"));

const isProjectsRoute = () => window.location.hash.startsWith("#/projects");

function hasWebGL() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

export default function App() {
  const [allProjects, setAllProjects] = useState(isProjectsRoute());
  const [webgl] = useState(hasWebGL);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

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
      {webgl ? <Suspense fallback={<div className="scene" />}><Scene reduced={reduced} /></Suspense> : <div className="scene" />}
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        {allProjects ? (
          <Projects projects={projects} all />
        ) : (
          <>
            <Hero projectCount={projects.length} />
            <Experience />
            <Skills />
            <Projects projects={projects.slice(0, 6)} />
            <Credentials />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
