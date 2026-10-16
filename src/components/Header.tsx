import { useEffect, useState } from "react";

const links = [
  ["Work", "projects"],
  ["Journey", "journey"],
  ["Skills", "skills"],
  ["Certificates", "credentials"],
  ["Contact", "contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("keydown", onKey);
      io.disconnect();
    };
  }, []);

  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ?? "dark");
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* storage blocked */ }
    setTheme(next);
  };

  return (
    <header className="header">
      <div className="container header-row">
        <a className="logo" href="#" onClick={() => setOpen(false)}>
          CodeWith<span>Vedang</span>
        </a>
        <div className="header-tools">
        <button className="theme-btn" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
          <span aria-hidden>{theme === "dark" ? "☀" : "☾"}</span>
        </button>
        <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        </div>
        <nav id="nav" aria-label="Primary" className={open ? "nav open" : "nav"}>
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} aria-current={current === id ? "true" : undefined} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="btn btn-sm" href="#contact" onClick={() => setOpen(false)}>Contact me</a>
        </nav>
      </div>
    </header>
  );
}
