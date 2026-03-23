import { useState } from "react";
import { postJson } from "../api/api";
import { useAuth } from "../context/AuthContext.jsx";

export default function HelpPage() {
  const { token, user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
    kind: "feedback"
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postJson("/support/complaints", form, token);
      setMessage(`Your ${form.kind} has been submitted successfully.`);
      setForm({
        name: user?.name || "",
        email: user?.email || "",
        subject: "",
        message: "",
        kind: "feedback"
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="page-shell">
      <section className="glass-card info-hero">
        <span className="eyebrow">Help</span>
        <h1>Get support, share feedback, or submit a complaint.</h1>
        <p>
          Use this page to send feedback, raise a complaint, or get help with bookings, tours, account access,
          and platform issues.
        </p>
      </section>

      <section className="info-grid">
        <article className="glass-card info-card">
          <h3>Booking Help</h3>
          <p>Review travel date, passengers, and package details before confirming a booking.</p>
        </article>
        <article className="glass-card info-card">
          <h3>Account Help</h3>
          <p>If login or register fails, verify your credentials and check that the backend is running.</p>
        </article>
        <article className="glass-card info-card">
          <h3>Tour Help</h3>
          <p>Use the tours page and country pages to compare destination details before choosing a package.</p>
        </article>
      </section>

      <section className="glass-card info-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Support Topics</span>
            <h2>Common help topics</h2>
          </div>
        </div>
        <div className="info-points">
          <div className="info-point">If flights or hotels do not load, check whether the backend API is running.</div>
          <div className="info-point">If payment does not appear completed, verify the booking status in the dashboard.</div>
          <div className="info-point">If a country page media item fails, refresh the page and try the fallback content.</div>
          <div className="info-point">Admin and agent panels require the correct account role.</div>
        </div>
      </section>

      <section className="glass-card info-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Feedback & Complaints</span>
            <h2>Send your message to support</h2>
          </div>
        </div>
        <form className="form-grid support-form" onSubmit={handleSubmit}>
          <label className="input-group">
            <span>Name</span>
            <input
              name="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </label>
          <label className="input-group">
            <span>Email</span>
            <input
              name="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <label className="input-group">
            <span>Type</span>
            <select
              name="kind"
              value={form.kind}
              onChange={(event) => setForm({ ...form, kind: event.target.value })}
            >
              <option value="feedback">Feedback</option>
              <option value="complaint">Complaint</option>
            </select>
          </label>
          <label className="input-group">
            <span>Subject</span>
            <input
              name="subject"
              value={form.subject}
              onChange={(event) => setForm({ ...form, subject: event.target.value })}
            />
          </label>
          <label className="input-group support-message">
            <span>Message</span>
            <textarea
              rows="6"
              name="message"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
            />
          </label>
          <button type="submit" className="button primary">
            Submit to Support
          </button>
          {message && <p className="helper-text">{message}</p>}
        </form>
      </section>
    </div>
  );
}
