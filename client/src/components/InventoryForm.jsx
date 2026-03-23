import { useState } from "react";
import { postJson, uploadFile } from "../api/api";
import { useAuth } from "../context/AuthContext.jsx";

const initialState = {
  flight: {
    airline: "",
    flightNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    price: "",
    seatsAvailable: "",
    classType: "Economy",
    image: ""
  },
  hotel: {
    name: "",
    city: "",
    country: "",
    pricePerNight: "",
    rating: "4.5",
    amenities: "",
    roomsAvailable: "",
    description: "",
    image: ""
  },
  tour: {
    title: "",
    destination: "",
    duration: "",
    price: "",
    groupSize: "",
    description: "",
    highlights: "",
    image: ""
  }
};

export default function InventoryForm({ type, onCreated }) {
  const { token, user } = useAuth();
  const [form, setForm] = useState(initialState[type]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadFile("/uploads/image", file, token);
      setForm((current) => ({ ...current, image: result.url }));
      setMessage("Image uploaded.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...form };
    if (payload.amenities) payload.amenities = payload.amenities.split(",").map((item) => item.trim());
    if (payload.highlights) payload.highlights = payload.highlights.split(",").map((item) => item.trim());

    const created = await postJson(`/${type}s`, payload, token);
    setForm(initialState[type]);
    setMessage(
      user?.role === "agent"
        ? `${type} submitted for admin approval. Current status: ${created.status}.`
        : `${type} created successfully.`
    );
    onCreated?.();
  };

  return (
    <form className="glass-card form-grid" onSubmit={handleSubmit}>
      {Object.keys(initialState[type]).map((field) => (
        <label key={field} className="input-group">
          <span>{field}</span>
          <input
            type={field.toLowerCase().includes("time") ? "datetime-local" : "text"}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
          />
        </label>
      ))}
      <label className="input-group">
        <span>Upload image</span>
        <input type="file" accept="image/*" onChange={handleUpload} />
      </label>
      <button type="submit" className="button primary" disabled={uploading}>
        {uploading ? "Uploading..." : `Add ${type}`}
      </button>
      {message && <p className="helper-text">{message}</p>}
    </form>
  );
}
