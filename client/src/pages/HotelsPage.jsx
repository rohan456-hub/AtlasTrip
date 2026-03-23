import { useEffect, useState } from "react";
import { getJson } from "../api/api";
import ListingCard from "../components/ListingCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function HotelsPage() {
  const [filters, setFilters] = useState({ city: "" });
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");

  const fetchHotels = async (params = filters) => {
    try {
      setError("");
      const query = new URLSearchParams(params).toString();
      const data = await getJson(`/hotels${query ? `?${query}` : ""}`);
      setHotels(data);
    } catch (fetchError) {
      setHotels([]);
      setError("The hotel API is unavailable right now. Start the backend server and refresh.");
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="page-shell">
      <SearchBar
        title="Hotels"
        subtitle="Compare stays, amenities, and nightly pricing"
        accent="hotels"
        hint="Look for destination stays with a quick city search and scan room value at a glance."
        stats={[
          { label: "Best for", value: "Stays" },
          { label: "Results", value: `${hotels.length}` }
        ]}
        fields={[{ name: "city", label: "City", placeholder: "Where are you staying?" }]}
        values={filters}
        onChange={(event) => setFilters({ city: event.target.value })}
        onSubmit={(event) => {
          event.preventDefault();
          fetchHotels();
        }}
      />
      {error && <div className="glass-card error-banner">{error}</div>}
      <section className="listing-grid">
        {hotels.map((hotel) => (
          <ListingCard
            key={hotel._id}
            item={hotel}
            type="hotel"
            meta={`${hotel.city}, ${hotel.country}`}
          />
        ))}
      </section>
    </div>
  );
}
