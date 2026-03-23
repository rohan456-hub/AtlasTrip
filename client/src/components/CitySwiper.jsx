import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    city: "India",
    title: "Discover vibrant India",
    description: "Plan cultural escapes, mountain tours, palace stays, and city adventures.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80"
  },
  {
    city: "Dubai",
    title: "Experience modern Dubai",
    description: "Book skyline hotels, desert experiences, and premium shopping trips.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80"
  },
  {
    city: "Japan",
    title: "Explore timeless Japan",
    description: "Combine fast city travel, peaceful temples, and unforgettable seasonal tours.",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1400&q=80"
  }
];

export default function CitySwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="city-swiper glass-card">
      {slides.map((slide, index) => (
        <article
          key={slide.city}
          className={`city-slide-panel ${index === activeIndex ? "active" : ""}`}
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.40), rgba(15, 23, 42, 0.46)), url(${slide.image})`
          }}
        >
          <div className="city-slide-content">
            <span className="eyebrow light">{slide.city}</span>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <div className="hero-actions">
              <Link to="/tours" className="button primary">
                View Tours
              </Link>
              <Link to="/flights" className="button ghost light-button">
                Search Flights
              </Link>
            </div>
          </div>
        </article>
      ))}
      <div className="swiper-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.city}
            type="button"
            className={`swiper-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${slide.city}`}
          />
        ))}
      </div>
    </section>
  );
}
