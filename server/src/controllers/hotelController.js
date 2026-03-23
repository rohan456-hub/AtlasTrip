import Hotel from "../models/Hotel.js";

export const getHotels = async (req, res) => {
  const { city } = req.query;
  const query =
    req.user?.role === "admin"
      ? {}
      : { $or: [{ status: "approved" }, { status: { $exists: false } }] };
  if (city) query.city = new RegExp(city, "i");
  const hotels = await Hotel.find(query).sort({ createdAt: -1 });
  res.json(hotels);
};

export const createHotel = async (req, res) => {
  const hotel = await Hotel.create({
    ...req.body,
    status: req.user.role === "admin" ? "approved" : "pending",
    submittedBy: req.user._id
  });
  res.status(201).json(hotel);
};
