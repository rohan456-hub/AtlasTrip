import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>AtlasTrip</h3>
          <p>Travel booking platform for flights, hotels, tours, and destination experiences.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/flights">Flights</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
        </div>

        <div className="footer-meta">
          <span>Built by Rohan Modi</span>
          <span>AtlasTrip Travel Booking Studio</span>
        </div>
      </div>
    </footer>
  );
}
