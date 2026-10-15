import { useEffect, useState } from "react";

const links = [
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Work", "projects"],
  ["Credentials", "credentials"],
  ["Contact", "contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(() => window.location.hash.slice(1) || "home");

  useEffect(() => {
    const onFace = (e: Event) => setCurrent((e as CustomEvent<string>).detail);
    window.addEventListener("face", onFace);
    return () => window.removeEventListener("face", onFace);
  }, []);

  return (
    <header className="header">
      <div className="container header-row">
        <a className="logo" href="#home" onClick={() => setOpen(false)}>
          vedang<span>.dev</span>
        </a>
        <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <nav id="nav" className={open ? "nav open" : "nav"}>
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className={current === id ? "on" : ""} aria-current={current === id ? "true" : undefined} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="btn btn-sm" href="mailto:shelatkarvedang2@gmail.com">Hire me</a>
        </nav>
      </div>
    </header>
  );
}
