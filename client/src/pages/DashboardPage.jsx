import { useEffect, useState } from "react";
import { downloadFile, getJson } from "../api/api";
import StatCard from "../components/StatCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function DashboardPage() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getJson("/dashboard", token).then((data) => {
      setStats(data);
      setNotifications(data.recentNotifications || []);
    });
    if (user?.role === "admin") {
      getJson("/bookings", token).then(setBookings);
    } else {
      getJson("/bookings/mine", token).then(setBookings);
    }
  }, [token, user]);

  const downloadReceipt = async (bookingId) => {
    const blob = await downloadFile(`/bookings/${bookingId}/receipt`, token);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `receipt-${bookingId}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-shell">
      <section className="dashboard-hero glass-card">
        <span className="eyebrow">Dashboard</span>
        <h1>{user?.role === "admin" ? "Platform command center" : "Your travel workspace"}</h1>
      </section>
      <section className="stat-grid">
        {user?.role === "admin" ? (
          <>
            <StatCard label="Users" value={stats?.users || 0} accent="#c93478" />
            <StatCard label="Flights" value={stats?.flights || 0} accent="#1b5676" />
            <StatCard label="Hotels" value={stats?.hotels || 0} accent="#343a72" />
            <StatCard label="Pending" value={stats?.pendingSubmissions || 0} accent="#df2956" />
            <StatCard label="Complaints" value={stats?.openComplaints || 0} accent="#2f2650" />
          </>
        ) : (
          <>
            <StatCard label="Bookings" value={stats?.totalBookings || 0} accent="#1b5676" />
            <StatCard label="Total Spent" value={`$${stats?.totalSpent || 0}`} accent="#c93478" />
            <StatCard
              label={user?.role === "agent" ? "Submissions" : "Notifications"}
              value={user?.role === "agent" ? stats?.totalSubmissions || 0 : notifications.length}
              accent="#343a72"
            />
          </>
        )}
      </section>
      <section className="glass-card dashboard-hero">
        <div className="section-header">
          <h2>{user?.role === "admin" ? "All bookings" : "Recent bookings"}</h2>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.bookingType}</td>
                  <td>{booking.travelDate}</td>
                  <td>${booking.totalAmount}</td>
                  <td>{booking.status}</td>
                  <td>
                    <button type="button" className="button ghost small" onClick={() => downloadReceipt(booking._id)}>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-card info-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Notifications</span>
            <h2>{user?.role === "admin" ? "Platform activity snapshot" : "Recent updates for you"}</h2>
          </div>
        </div>
        <div className="complaint-stack">
          {notifications.length ? (
            notifications.map((notification) => (
              <article key={notification._id} className="complaint-card">
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
              </article>
            ))
          ) : (
            <article className="complaint-card">No notifications yet.</article>
          )}
        </div>
      </section>
    </div>
  );
}
