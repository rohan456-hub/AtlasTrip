import Notification from "../models/Notification.js";

export const getMyNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
};

export const markNotificationRead = async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification || String(notification.user) !== String(req.user._id)) {
    return res.status(404).json({ message: "Notification not found" });
  }

  notification.read = true;
  await notification.save();
  res.json(notification);
};
