import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getJson } from "../api/api";

const fallbackByDestination = {
  Morocco: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
};

export default function CountryTourSlider() {
  const trackRef = useRef(null);
  const [tours, setTours] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getJson("/tours")
      .then((data) => {
        setTours(data);
        setError("");
      })
      .catch(() => {
        setTours([]);
        setError("Tour packages are unavailable right now. Start the backend server and refresh.");
      });
  }, []);

  const scrollSlider = (direction) => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.85;
    trackRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth"
    });
  };

  return (
    <section className="glass-card slider-shell">
      <div className="section-header">
        <div>
          <span className="eyebrow">Country tours</span>
          <h2>Explore tour packages by destination</h2>
        </div>
        <div className="slider-actions">
          <button type="button" className="button ghost small" onClick={() => scrollSlider("prev")}>
            Prev
          </button>
          <button type="button" className="button ghost small" onClick={() => scrollSlider("next")}>
            Next
          </button>
        </div>
      </div>
      {error && <div className="glass-card error-banner">{error}</div>}
      <div className="slider-track" ref={trackRef}>
        {tours.map((tour) => (
          <article key={tour._id} className="country-slide">
            <img
              src={tour.image || fallbackByDestination[tour.destination]}
              alt={tour.title}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  fallbackByDestination[tour.destination] ||
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <div className="country-slide-body">
              <span className="eyebrow">{tour.destination}</span>
              <h3>{tour.title}</h3>
              <p>{tour.description}</p>
              <div className="country-slide-meta">
                <span>{tour.duration}</span>
                <span>${tour.price}</span>
              </div>
              <Link to={`/booking/tour/${tour._id}`} className="button primary">
                Book Package
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
