import { certificates } from "../data/profile";

export function Credentials() {
  return (
    <section className="section" id="credentials">
      <div className="container">
        <h2>Certificates</h2>
        <div className="card" style={{ alignItems: "stretch" }}>
          <ul className="list cert-list">{certificates.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
