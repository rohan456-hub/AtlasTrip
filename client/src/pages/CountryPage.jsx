import { Link, Navigate, useParams } from "react-router-dom";
import { getCountryBySlug } from "../data/countries.js";

export default function CountryPage() {
  const { slug } = useParams();
  const country = getCountryBySlug(slug);

  if (!country) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page-shell">
      <section className="country-page-hero glass-card">
        <video
          className="country-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={country.heroImage}
        >
          <source src={country.heroVideo} type="video/mp4" />
        </video>
        <div className="country-page-overlay">
          <div className="country-page-title">
            <img className="country-flag large" src={country.flag} alt={`${country.name} flag`} />
            <div>
              <span className="eyebrow light">Country Guide</span>
              <h1>{country.name}</h1>
            </div>
          </div>
          <p>{country.overview}</p>
          <div className="hero-actions">
            <Link to="/tours" className="button primary">
              Explore Tours
            </Link>
            <Link to="/" className="button ghost light-button">
              Back Home
            </Link>
          </div>
        </div>
      </section>

      <section className="glass-card country-gallery-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Gallery</span>
            <h2>{country.name} highlights</h2>
          </div>
        </div>
        <div className="country-gallery-grid">
          {country.gallery.map((image, index) => (
            <img key={`${country.slug}-${index}`} src={image} alt={`${country.name} gallery ${index + 1}`} />
          ))}
        </div>
      </section>

      <section className="country-page-grid">
        <article className="glass-card country-info-card">
          <h3>Best time to visit</h3>
          <p>{country.bestTime}</p>
        </article>
        <article className="glass-card country-info-card">
          <h3>Popular cities</h3>
          <div className="country-points">
            {country.popularCities.map((city) => (
              <span key={city}>{city}</span>
            ))}
          </div>
        </article>
        <article className="glass-card country-info-card">
          <h3>Main attractions</h3>
          <div className="country-points">
            {country.attractions.map((attraction) => (
              <span key={attraction}>{attraction}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="glass-card country-detail-stack">
        <div className="section-header">
          <div>
            <span className="eyebrow">Tourist Details</span>
            <h2>Why travelers choose {country.name}</h2>
          </div>
        </div>
        <div className="country-note-grid">
          {country.touristDetails.map((detail) => (
            <article key={detail} className="country-detail-note">
              {detail}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
