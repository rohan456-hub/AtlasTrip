import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJson, postJson } from "../api/api";
import PassengerForm from "../components/PassengerForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const typeMap = {
  flight: "flights",
  hotel: "hotels",
  tour: "tours"
};

export default function BookingPage() {
  const { type, id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [travelDate, setTravelDate] = useState("");
  const [notes, setNotes] = useState("");
  const [passengers, setPassengers] = useState([
    { firstName: "", lastName: "", age: "", gender: "Male", passportNumber: "" }
  ]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getJson(`/${typeMap[type]}`).then((items) => {
      setItem(items.find((entry) => entry._id === id) || null);
    });
  }, [id, type]);

  const totalAmount = useMemo(() => {
    if (!item) return 0;
    const basePrice = item.price || item.pricePerNight || 0;
    return basePrice * passengers.length;
  }, [item, passengers.length]);

  const handleBooking = async () => {
    const paymentIntent = await postJson(
      "/payments/intent",
      {
        amount: Math.round(totalAmount * 100),
        metadata: { bookingType: type, itemId: id }
      },
      token
    );

    await postJson(
      "/bookings",
      {
        bookingType: type,
        itemId: id,
        passengers,
        travelDate,
        totalAmount,
        customerNotes: notes,
        paymentIntentId: paymentIntent.clientSecret,
        status: "paid"
      },
      token
    );

    setMessage("Booking confirmed and marked as paid.");
    setTimeout(() => navigate("/dashboard"), 700);
  };

  if (!item) {
    return (
      <div className="page-shell">
        <div className="glass-card">Loading booking details...</div>
      </div>
    );
  }

  return (
    <div className="page-shell booking-layout">
      <section className="glass-card booking-summary">
        <span className="eyebrow">Booking summary</span>
        <h1>{item.title || item.name || item.airline}</h1>
        <p>{item.destination || item.city || `${item.from} to ${item.to}`}</p>
        <strong className="amount">${totalAmount}</strong>
        <label className="input-group">
          <span>Travel date</span>
          <input type="date" value={travelDate} onChange={(event) => setTravelDate(event.target.value)} />
        </label>
        <label className="input-group">
          <span>Notes</span>
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows="4" />
        </label>
      </section>
      <section className="booking-form-area">
        <PassengerForm passengers={passengers} setPassengers={setPassengers} />
        {message && <p className="helper-text">{message}</p>}
        <div className="booking-actions">
          <button type="button" className="button primary" onClick={handleBooking} disabled={!travelDate}>
            Pay & Confirm
          </button>
        </div>
      </section>
    </div>
  );
}
