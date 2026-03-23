import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    kind: {
      type: String,
      enum: ["feedback", "complaint"],
      default: "feedback"
    },
    status: {
      type: String,
      enum: ["open", "in_review", "resolved", "closed"],
      default: "open"
    },
    adminNote: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
