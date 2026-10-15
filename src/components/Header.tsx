import { useState } from "react";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-row">
        <a className="logo" href="#home" onClick={() => setOpen(false)}>
          vedang<span>.</span>
        </a>
        <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <nav id="nav" className={open ? "nav open" : "nav"}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="btn btn-sm" href="mailto:shelatkarvedang2@gmail.com">Hire me</a>
        </nav>
      </div>
    </header>
  );
}
