import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    passportNumber: String
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookingType: {
      type: String,
      enum: ["flight", "hotel", "tour"],
      required: true
    },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    passengers: [passengerSchema],
    travelDate: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending"
    },
    paymentIntentId: { type: String, default: "" },
    customerNotes: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
