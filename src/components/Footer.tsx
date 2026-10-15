export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <p>© {new Date().getFullYear()} Vedang Shelatkar. All rights reserved.</p>
        <a className="link" href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
