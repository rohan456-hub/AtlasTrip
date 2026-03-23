import Flight from "../models/Flight.js";
import Hotel from "../models/Hotel.js";
import Tour from "../models/Tour.js";
import { createNotification } from "../utils/createNotification.js";

const modelMap = {
  flight: Flight,
  hotel: Hotel,
  tour: Tour
};

export const getPendingInventory = async (_req, res) => {
  const [flights, hotels, tours] = await Promise.all([
    Flight.find({ status: "pending" }).populate("submittedBy", "name email companyName").sort({ createdAt: -1 }),
    Hotel.find({ status: "pending" }).populate("submittedBy", "name email companyName").sort({ createdAt: -1 }),
    Tour.find({ status: "pending" }).populate("submittedBy", "name email companyName").sort({ createdAt: -1 })
  ]);

  res.json({ flights, hotels, tours });
};

export const reviewInventory = async (req, res) => {
  const { type, id } = req.params;
  const Model = modelMap[type];
  if (!Model) {
    return res.status(400).json({ message: "Invalid inventory type" });
  }

  const item = await Model.findById(id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  const nextStatus = req.body.status;
  if (!["approved", "rejected"].includes(nextStatus)) {
    return res.status(400).json({ message: "Invalid review status" });
  }

  item.status = nextStatus;
  item.reviewedBy = req.user._id;
  item.reviewNote = req.body.reviewNote || "";
  await item.save();

  if (item.submittedBy) {
    await createNotification({
      user: item.submittedBy,
      title: `${type[0].toUpperCase()}${type.slice(1)} ${nextStatus}`,
      message:
        nextStatus === "approved"
          ? `Your ${type} submission is approved and now live on the platform.`
          : `Your ${type} submission was rejected. ${item.reviewNote || "Please review the admin note."}`,
      type: "submission"
    });
  }

  res.json(item);
};
