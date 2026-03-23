import { useEffect, useState } from "react";
import { getJson, postJson } from "../api/api";
import InventoryForm from "../components/InventoryForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminPage() {
  const { token } = useAuth();
  const [type, setType] = useState("flight");
  const [pending, setPending] = useState({ flights: [], hotels: [], tours: [] });
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");

  const loadAdminData = async () => {
    const [pendingData, complaintData] = await Promise.all([
      getJson("/admin/pending", token),
      getJson("/support/complaints", token)
    ]);
    setPending(pendingData);
    setComplaints(complaintData);
  };

  useEffect(() => {
    loadAdminData();
  }, [token]);

  const reviewItem = async (entryType, id, status) => {
    await postJson(`/admin/review/${entryType}/${id}`, { status }, token, "PATCH");
    setMessage(`${entryType} ${status}.`);
    loadAdminData();
  };

  const updateComplaint = async (id, status) => {
    await postJson(`/support/complaints/${id}`, { status }, token, "PATCH");
    setMessage(`Complaint marked as ${status}.`);
    loadAdminData();
  };

  const pendingGroups = [
    ["flight", pending.flights],
    ["hotel", pending.hotels],
    ["tour", pending.tours]
  ];

  return (
    <div className="page-shell">
      <section className="glass-card admin-header">
        <span className="eyebrow">Admin panel</span>
        <h1>Approve agent inventory and manage traveler support</h1>
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
        {message && <p className="helper-text">{message}</p>}
      </section>
      <InventoryForm type={type} onCreated={() => {}} />

      <section className="glass-card info-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Pending Approvals</span>
            <h2>Agent submissions waiting for review</h2>
          </div>
        </div>
        <div className="approval-grid">
          {pendingGroups.map(([entryType, items]) => (
            <div key={entryType} className="approval-column">
              <h3>{entryType}</h3>
              {items.length ? (
                items.map((item) => (
                  <article key={item._id} className="approval-card">
                    <strong>{item.title || item.name || item.airline}</strong>
                    <p>{item.destination || item.city || `${item.from} to ${item.to}`}</p>
                    <span>By {item.submittedBy?.companyName || item.submittedBy?.name || "Agent"}</span>
                    <div className="tab-row">
                      <button type="button" className="button primary small" onClick={() => reviewItem(entryType, item._id, "approved")}>
                        Approve
                      </button>
                      <button type="button" className="button ghost small" onClick={() => reviewItem(entryType, item._id, "rejected")}>
                        Reject
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="approval-card muted">No pending {entryType} submissions.</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card info-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Complaints & Feedback</span>
            <h2>All traveler support messages</h2>
          </div>
        </div>
        <div className="complaint-stack">
          {complaints.map((complaint) => (
            <article key={complaint._id} className="complaint-card">
              <div className="section-header">
                <div>
                  <h3>{complaint.subject}</h3>
                  <p>
                    {complaint.name} • {complaint.email} • {complaint.kind}
                  </p>
                </div>
                <span className="eyebrow">{complaint.status}</span>
              </div>
              <p>{complaint.message}</p>
              <div className="tab-row">
                {["open", "in_review", "resolved", "closed"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`button ${complaint.status === status ? "primary" : "ghost"} small`}
                    onClick={() => updateComplaint(complaint._id, status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
