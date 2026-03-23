import Notification from "../models/Notification.js";

export const createNotification = async ({ user, title, message, type = "system" }) => {
  if (!user) return null;
  return Notification.create({ user, title, message, type });
};
