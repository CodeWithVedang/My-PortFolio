import { FormEvent, useState } from "react";
import { profile } from "../data/profile";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx9X_qUdIullPJ5Ze4fyLda2aClKIeCI4fRzVTIeeJ8WSI8ykm3fu2cSLLDNuVoeSDH/exec";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("sheetName", "Contact-Form");
    setStatus("sending");
    try {
      const res = await fetch(SCRIPT_URL, { method: "POST", body: data });
      const json: { result?: string } = await res.json();
      if (json.result !== "success") throw new Error("rejected");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section container" id="contact">
      <h2 className="section-title">Contact</h2>
      <div className="contact-grid">
        <div>
          <p className="lead">Have a role, project or idea? Send a message.</p>
          <p><a className="link" href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p className="muted">{profile.location}</p>
          <div className="actions">
            <a className="btn btn-ghost btn-sm" href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="btn btn-ghost btn-sm" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn btn-ghost btn-sm" href={profile.links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <form className="card form" onSubmit={onSubmit}>
          <label>Full name<input name="Full Name" required autoComplete="name" /></label>
          <label>Email<input name="Email Address" type="email" required autoComplete="email" /></label>
          <label>Subject<input name="Subject" /></label>
          <label>Message<textarea name="Message" rows={5} required /></label>
          <button className="btn" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
          <p role="status" className={`form-msg ${status}`}>
            {status === "success" && "Thanks! Your message was sent."}
            {status === "error" && "Could not send. Please try again or email me directly."}
          </p>
        </form>
      </div>
    </section>
  );
}
