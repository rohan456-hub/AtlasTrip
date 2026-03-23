import { Link } from "react-router-dom";
import { countries } from "../data/countries.js";

export default function CountryDirectory() {
  return (
    <section className="glass-card country-directory">
      <div className="section-header">
        <div>
          <span className="eyebrow">Countries</span>
          <h2>Open a destination page for every country</h2>
        </div>
      </div>
      <div className="country-card-grid">
        {countries.map((country) => (
          <article key={country.slug} className="country-card">
            <img className="country-hero" src={country.heroImage} alt={country.name} />
            <div className="country-card-body">
              <div className="country-card-title">
                <img className="country-flag" src={country.flag} alt={`${country.name} flag`} />
                <div>
                  <h3>{country.name}</h3>
                  <p>{country.bestTime}</p>
                </div>
              </div>
              <p>{country.overview}</p>
              <div className="country-mini-points">
                {country.popularCities.slice(0, 3).map((city) => (
                  <span key={city}>{city}</span>
                ))}
              </div>
              <Link to={`/countries/${country.slug}`} className="button primary">
                View Country
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
