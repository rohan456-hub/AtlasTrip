import { useEffect, useState } from "react";
import { getJson } from "../api/api";
import ListingCard from "../components/ListingCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function FlightsPage() {
  const [filters, setFilters] = useState({ from: "", to: "" });
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  const fetchFlights = async (params = filters) => {
    try {
      setError("");
      const query = new URLSearchParams(params).toString();
      const data = await getJson(`/flights${query ? `?${query}` : ""}`);
      setFlights(data);
    } catch (fetchError) {
      setFlights([]);
      setError("The flight API is unavailable right now. Start the backend server and refresh.");
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="page-shell">
      <SearchBar
        title="Flights"
        subtitle="Find routes with quick availability checks"
        accent="flights"
        hint="Search city-to-city journeys and compare departure timing, class, and fare options."
        stats={[
          { label: "Best for", value: "Routes" },
          { label: "Results", value: `${flights.length}` }
        ]}
        fields={[
          { name: "from", label: "From", placeholder: "City or airport" },
          { name: "to", label: "To", placeholder: "Destination" }
        ]}
        values={filters}
        onChange={(event) => setFilters({ ...filters, [event.target.name]: event.target.value })}
        onSubmit={(event) => {
          event.preventDefault();
          fetchFlights();
        }}
      />
      {error && <div className="glass-card error-banner">{error}</div>}
      <section className="listing-grid">
        {flights.map((flight) => (
          <ListingCard
            key={flight._id}
            item={flight}
            type="flight"
            meta={`${flight.from} to ${flight.to} • ${flight.flightNumber}`}
          />
        ))}
      </section>
    </div>
  );
}
