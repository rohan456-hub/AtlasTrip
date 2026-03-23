import CitySwiper from "../components/CitySwiper.jsx";
import CountryDirectory from "../components/CountryDirectory.jsx";
import Hero from "../components/Hero.jsx";
import CountryTourSlider from "../components/CountryTourSlider.jsx";

const features = [
  "Flight and hotel search with fast filters",
  "Tour package discovery with rich cards",
  "Dynamic passenger form and booking workflow",
  "Admin and agent control panels",
  "Image uploads, payments, and PDF receipts"
];

export default function HomePage() {
  return (
    <div className="page-shell home-flow">
      <section className="home-block">
        <CitySwiper />
      </section>

      <section className="home-block">
        <Hero />
      </section>

      <section className="home-block">
        <div className="section-lead">
          <span className="eyebrow">Destinations</span>
          <h2>Choose a country and open its full travel page</h2>
          <p>Browse destination pages with flags, tourist details, video headers, and image galleries.</p>
        </div>
        <CountryDirectory />
      </section>

      <section className="home-block">
        <div className="section-lead">
          <span className="eyebrow">Packages</span>
          <h2>Featured country tour packages</h2>
          <p>Scroll through ready-made tours and jump directly into booking.</p>
        </div>
        <CountryTourSlider />
      </section>

      <section className="home-block">
        <div className="section-lead">
          <span className="eyebrow">Platform</span>
          <h2>Everything you need to manage travel bookings</h2>
        </div>
        <section className="feature-grid">
          {features.map((feature) => (
            <article key={feature} className="glass-card feature-card">
              <span className="eyebrow">Capability</span>
              <h3>{feature}</h3>
              <p>Designed for production-style travel operations with a clean component structure.</p>
            </article>
          ))}
        </section>
      </section>
    </div>
  );
}
