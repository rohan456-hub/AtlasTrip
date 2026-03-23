import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    seatsAvailable: { type: Number, required: true, default: 0 },
    classType: { type: String, default: "Economy" },
    image: { type: String, default: "" },
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

export default mongoose.model("Flight", flightSchema);
