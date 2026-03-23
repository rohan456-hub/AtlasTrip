import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    details: String
  },
  { _id: false }
);

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    groupSize: { type: Number, default: 2 },
    description: { type: String, default: "" },
    highlights: [{ type: String }],
    itinerary: [itinerarySchema],
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

export default mongoose.model("Tour", tourSchema);
