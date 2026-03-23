import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    amenities: [{ type: String }],
    image: { type: String, default: "" },
    roomsAvailable: { type: Number, default: 0 },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved"
    },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reviewNote: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
