import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-copy glass-card hero-copy-plane-bg">
        <span className="eyebrow">Travel booking platform</span>
        <h1>Plan flights, hotels, tours, and payments in one polished workspace.</h1>
        <p>
          AtlasTrip is built for modern travelers, travel agents, and platform admins with a smooth booking
          flow, responsive search experience, and downloadable receipts.
        </p>
        <div className="hero-actions">
          <Link to="/flights" className="button primary">
            Search Flights
          </Link>
          <Link to="/tours" className="button ghost">
            Explore Tours
          </Link>
        </div>
      </div>
      <div className="hero-metrics">
        <div className="metric-card glass-card">
          <strong>120+</strong>
          <span>Curated trips</span>
        </div>
        <div className="metric-card glass-card">
          <strong>24/7</strong>
          <span>Agent support</span>
        </div>
        <div className="metric-card glass-card">
          <strong>Secure</strong>
          <span>JWT + payment flow</span>
        </div>
      </div>
    </section>
  );
}
