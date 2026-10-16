import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <p>© {new Date().getFullYear()} CodeWithVedang · {profile.name}</p>
        <p className="social">
          <a className="link" href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="link" href="#">Back to top ↑</a>
        </p>
      </div>
    </footer>
  );
}
