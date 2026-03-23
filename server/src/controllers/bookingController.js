import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";
import Hotel from "../models/Hotel.js";
import Tour from "../models/Tour.js";
import { createNotification } from "../utils/createNotification.js";
import { createReceiptBuffer } from "../utils/receiptGenerator.js";

const modelMap = {
  flight: Flight,
  hotel: Hotel,
  tour: Tour
};

export const createBooking = async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    user: req.user._id
  });

  await createNotification({
    user: req.user._id,
    title: "Booking created",
    message: `Your ${booking.bookingType} booking has been created with status ${booking.status}.`,
    type: "booking"
  });

  res.status(201).json(booking);
};

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (String(booking.user) !== String(req.user._id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  booking.status = req.body.status || booking.status;
  booking.paymentIntentId = req.body.paymentIntentId || booking.paymentIntentId;
  await booking.save();

  await createNotification({
    user: booking.user,
    title: "Booking updated",
    message: `Your ${booking.bookingType} booking is now ${booking.status}.`,
    type: "booking"
  });

  return res.json(booking);
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
  const enriched = await Promise.all(
    bookings.map(async (booking) => {
      const Model = modelMap[booking.bookingType];
      const item = Model ? await Model.findById(booking.itemId) : null;
      return { ...booking.toObject(), item };
    })
  );
  res.json(enriched);
};

export const getAllBookings = async (_req, res) => {
  const bookings = await Booking.find().populate("user", "name email role").sort({ createdAt: -1 });
  res.json(bookings);
};

export const downloadReceipt = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (String(booking.user) !== String(req.user._id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const Model = modelMap[booking.bookingType];
  const item = Model ? await Model.findById(booking.itemId) : null;
  const bookingUser = String(booking.user) === String(req.user._id) ? req.user : await booking.populate("user", "name email");
  const pdfBuffer = await createReceiptBuffer(booking, item, bookingUser.user || bookingUser);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=receipt-${booking._id}.pdf`);
  res.send(pdfBuffer);
};
