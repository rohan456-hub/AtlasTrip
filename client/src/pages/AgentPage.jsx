import { useEffect, useState } from "react";
import { getJson } from "../api/api";
import InventoryForm from "../components/InventoryForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function AgentPage() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [type, setType] = useState("tour");
  const [submissions, setSubmissions] = useState({ flights: [], hotels: [], tours: [] });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Promise.all([
      getJson("/dashboard", token),
      getJson("/dashboard/submissions", token),
      getJson("/notifications", token)
    ]).then(([dashboardData, submissionData, notificationData]) => {
      setStats(dashboardData);
      setSubmissions(submissionData);
      setNotifications(notificationData);
    });
  }, [token]);

  return (
    <div className="page-shell">
      <section className="glass-card admin-header">
        <span className="eyebrow">Client panel</span>
        <h1>{user?.companyName || user?.name}, manage your sales inventory</h1>
        <p>Travel agents can create flights, hotels, and tours for client-facing bookings.</p>
      </section>
      <section className="stat-grid">
        <div className="stat-card glass-card">
          <span>Assigned Bookings</span>
          <strong>{stats?.totalBookings || 0}</strong>
        </div>
        <div className="stat-card glass-card">
          <span>Revenue Snapshot</span>
          <strong>${stats?.totalSpent || 0}</strong>
        </div>
        <div className="stat-card glass-card">
          <span>My Submissions</span>
          <strong>{stats?.totalSubmissions || 0}</strong>
        </div>
      </section>
      <section className="glass-card admin-header">
        <div className="tab-row">
          {["flight", "hotel", "tour"].map((entry) => (
            <button
              key={entry}
              type="button"
              className={`button ${type === entry ? "primary" : "ghost"}`}
              onClick={() => setType(entry)}
            >
              {entry}
            </button>
          ))}
        </div>
      </section>
      <InventoryForm
        type={type}
        onCreated={() => {
          Promise.all([getJson("/dashboard/submissions", token), getJson("/notifications", token)]).then(
            ([submissionData, notificationData]) => {
              setSubmissions(submissionData);
              setNotifications(notificationData);
            }
          );
        }}
      />

      <section className="info-grid">
        <article className="glass-card info-card">
          <h3>Submission Queue</h3>
          <p>
            Flights: {submissions.flights.length} • Hotels: {submissions.hotels.length} • Tours: {submissions.tours.length}
          </p>
        </article>
        <article className="glass-card info-card">
          <h3>Latest Notifications</h3>
          <p>{notifications.length ? `${notifications.length} updates available` : "No notifications yet."}</p>
        </article>
      </section>

      <section className="glass-card info-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">My Inventory</span>
            <h2>Submission status</h2>
          </div>
        </div>
        <div className="approval-grid">
          {[
            ["Flights", submissions.flights],
            ["Hotels", submissions.hotels],
            ["Tours", submissions.tours]
          ].map(([label, items]) => (
            <div key={label} className="approval-column">
              <h3>{label}</h3>
              {items.length ? (
                items.map((item) => (
                  <article key={item._id} className="approval-card">
                    <strong>{item.title || item.name || item.airline}</strong>
                    <p>{item.destination || item.city || `${item.from} to ${item.to}`}</p>
                    <span>Status: {item.status}</span>
                  </article>
                ))
              ) : (
                <div className="approval-card muted">No submissions yet.</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card info-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Notifications</span>
            <h2>Admin updates for your submissions</h2>
          </div>
        </div>
        <div className="complaint-stack">
          {notifications.map((notification) => (
            <article key={notification._id} className="complaint-card">
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
