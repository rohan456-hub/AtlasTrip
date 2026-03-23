export default function StatCard({ label, value, accent }) {
  return (
    <div className="stat-card glass-card">
      <span>{label}</span>
      <strong style={{ color: accent }}>{value}</strong>
    </div>
  );
}
