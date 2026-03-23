import Complaint from "../models/Complaint.js";
import { createNotification } from "../utils/createNotification.js";

export const createComplaint = async (req, res) => {
  const complaint = await Complaint.create({
    ...req.body,
    user: req.user?._id || null
  });

  if (req.user?._id) {
    await createNotification({
      user: req.user._id,
      title: "Support request received",
      message: `Your ${complaint.kind} has been submitted and is now being reviewed.`,
      type: "complaint"
    });
  }

  res.status(201).json(complaint);
};

export const getComplaints = async (_req, res) => {
  const complaints = await Complaint.find().populate("user", "name email role").sort({ createdAt: -1 });
  res.json(complaints);
};

export const updateComplaintStatus = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  complaint.status = req.body.status || complaint.status;
  complaint.adminNote = req.body.adminNote || complaint.adminNote;
  await complaint.save();

  if (complaint.user) {
    await createNotification({
      user: complaint.user,
      title: "Support update",
      message: `Your ${complaint.kind} is now marked as ${complaint.status.replace("_", " ")}.`,
      type: "complaint"
    });
  }

  res.json(complaint);
};
