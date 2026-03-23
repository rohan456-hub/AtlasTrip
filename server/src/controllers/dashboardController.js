import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";
import Hotel from "../models/Hotel.js";
import Notification from "../models/Notification.js";
import Complaint from "../models/Complaint.js";
import Tour from "../models/Tour.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  if (req.user.role === "admin") {
    const liveInventoryFilter = {
      $or: [{ status: "approved" }, { status: { $exists: false } }]
    };
    const [users, flights, hotels, tours, bookings, pendingFlights, pendingHotels, pendingTours, complaints, notifications] = await Promise.all([
      User.countDocuments(),
      Flight.countDocuments(liveInventoryFilter),
      Hotel.countDocuments(liveInventoryFilter),
      Tour.countDocuments(liveInventoryFilter),
      Booking.countDocuments(),
      Flight.countDocuments({ status: "pending" }),
      Hotel.countDocuments({ status: "pending" }),
      Tour.countDocuments({ status: "pending" }),
      Complaint.countDocuments({ status: { $in: ["open", "in_review"] } }),
      Notification.countDocuments()
    ]);

    return res.json({
      users,
      flights,
      hotels,
      tours,
      bookings,
      pendingSubmissions: pendingFlights + pendingHotels + pendingTours,
      openComplaints: complaints,
      notifications
    });
  }

  if (req.user.role === "agent") {
    const [bookings, spent, myFlights, myHotels, myTours, notifications] = await Promise.all([
      Booking.find({ user: req.user._id }).sort({ createdAt: -1 }),
      Booking.aggregate([
        { $match: { user: req.user._id } },
        { $group: { _id: null, totalSpent: { $sum: "$totalAmount" } } }
      ]),
      Flight.countDocuments({ submittedBy: req.user._id }),
      Hotel.countDocuments({ submittedBy: req.user._id }),
      Tour.countDocuments({ submittedBy: req.user._id }),
      Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5)
    ]);

    return res.json({
      totalBookings: bookings.length,
      totalSpent: spent[0]?.totalSpent || 0,
      totalSubmissions: myFlights + myHotels + myTours,
      latestBookings: bookings.slice(0, 5),
      recentNotifications: notifications
    });
  }

  const [bookings, spent, notifications] = await Promise.all([
    Booking.find({ user: req.user._id }).sort({ createdAt: -1 }),
    Booking.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, totalSpent: { $sum: "$totalAmount" } } }
    ]),
    Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5)
  ]);

  return res.json({
    totalBookings: bookings.length,
    totalSpent: spent[0]?.totalSpent || 0,
    latestBookings: bookings.slice(0, 5),
    recentNotifications: notifications
  });
};

export const getMySubmissions = async (req, res) => {
  const [flights, hotels, tours] = await Promise.all([
    Flight.find({ submittedBy: req.user._id }).sort({ createdAt: -1 }),
    Hotel.find({ submittedBy: req.user._id }).sort({ createdAt: -1 }),
    Tour.find({ submittedBy: req.user._id }).sort({ createdAt: -1 })
  ]);

  res.json({ flights, hotels, tours });
};
