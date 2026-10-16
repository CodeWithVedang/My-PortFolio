import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Journey } from "./components/Journey";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Credentials } from "./components/Credentials";
import { Contact } from "./components/Contact";
import { Progress } from "./components/Progress";
import { Footer } from "./components/Footer";
import projects from "./data/projects.json";

const isProjectsRoute = () => window.location.hash.startsWith("#/projects");

export default function App() {
  const [allProjects, setAllProjects] = useState(isProjectsRoute());

  useEffect(() => {
    const sync = () => {
      const all = isProjectsRoute();
      setAllProjects(all);
      if (all) return window.scrollTo(0, 0);
      const id = window.location.hash.slice(1);
      // wait for the home sections to mount before scrolling
      requestAnimationFrame(() => (id ? document.getElementById(id)?.scrollIntoView() : window.scrollTo(0, 0)));
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = document.querySelectorAll<HTMLElement>(".section > h2, .section-head, .card, .step, .contact-grid > *");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el, i) => { el.classList.add("reveal"); el.style.transitionDelay = `${(i % 3) * 70}ms`; io.observe(el); });
    return () => io.disconnect();
  }, [allProjects]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Progress />
      <Header />
      <main id="main">
        {allProjects ? (
          <Projects projects={projects} all />
        ) : (
          <>
            <Hero projectCount={projects.length} />
            <Projects projects={projects} />
            <Journey />
            <Skills />
            <Credentials />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
