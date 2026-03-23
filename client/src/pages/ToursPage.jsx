import { useEffect, useState } from "react";
import { getJson } from "../api/api";
import ListingCard from "../components/ListingCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function ToursPage() {
  const [filters, setFilters] = useState({ destination: "" });
  const [tours, setTours] = useState([]);
  const [error, setError] = useState("");

  const fetchTours = async (params = filters) => {
    try {
      setError("");
      const query = new URLSearchParams(params).toString();
      const data = await getJson(`/tours${query ? `?${query}` : ""}`);
      setTours(data);
    } catch (fetchError) {
      setTours([]);
      setError("The tour API is unavailable right now. Start the backend server and refresh.");
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className="page-shell">
      <SearchBar
        title="Tours"
        subtitle="Browse curated packages with ready-to-sell itineraries"
        accent="tours"
        hint="Search destination-led experiences and explore packaged tours built for quick booking."
        stats={[
          { label: "Best for", value: "Packages" },
          { label: "Results", value: `${tours.length}` }
        ]}
        fields={[{ name: "destination", label: "Destination", placeholder: "Search country or city" }]}
        values={filters}
        onChange={(event) => setFilters({ destination: event.target.value })}
        onSubmit={(event) => {
          event.preventDefault();
          fetchTours();
        }}
      />
      {error && <div className="glass-card error-banner">{error}</div>}
      <section className="listing-grid">
        {tours.map((tour) => (
          <ListingCard key={tour._id} item={tour} type="tour" meta={`${tour.destination} • ${tour.duration}`} />
        ))}
      </section>
    </div>
  );
}
