export default function AboutPage() {
  return (
    <div className="page-shell">
      <section className="glass-card info-hero">
        <span className="eyebrow">About Us</span>
        <h1>AtlasTrip was built by Rohan Modi.</h1>
        <p>
          AtlasTrip is a modern travel booking platform where users can explore flights, hotels, tours,
          bookings, and destination pages in one place. The platform is focused on a clean experience, a
          simple booking flow, and strong travel presentation.
        </p>
      </section>

      <section className="info-grid">
        <article className="glass-card info-card">
          <h3>Founder</h3>
          <p>Rohan Modi</p>
        </article>
        <article className="glass-card info-card">
          <h3>Mission</h3>
          <p>To make travel planning simple, premium, and visually engaging.</p>
        </article>
        <article className="glass-card info-card">
          <h3>Platform Focus</h3>
          <p>Flights, hotels, tours, country pages, booking management, and traveler support.</p>
        </article>
      </section>

      <section className="glass-card info-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Why AtlasTrip</span>
            <h2>A complete travel experience in one platform</h2>
          </div>
        </div>
        <div className="info-points">
          <div className="info-point">Flight search, hotel search, and tour discovery in one place.</div>
          <div className="info-point">Dedicated country pages with flags, media, and tourist details.</div>
          <div className="info-point">Admin aur agent workflows ke saath scalable booking system.</div>
          <div className="info-point">Scalable booking workflows for travelers, agents, and admins.</div>
          <div className="info-point">A clean UI that keeps travel planning clear and easy to use.</div>
        </div>
      </section>
    </div>
  );
}
