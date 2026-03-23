import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="brand brand-mark">
      <span className="brand-icon" aria-hidden="true">
        <span className="brand-icon-sun" />
        <span className="brand-icon-path" />
      </span>
      <span className="brand-copy">
        <strong>AtlasTrip</strong>
        <small>Travel Booking Studio</small>
      </span>
    </Link>
  );
}
