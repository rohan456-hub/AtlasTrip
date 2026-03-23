import Flight from "../models/Flight.js";

export const getFlights = async (req, res) => {
  const { from, to } = req.query;
  const query =
    req.user?.role === "admin"
      ? {}
      : { $or: [{ status: "approved" }, { status: { $exists: false } }] };
  if (from) query.from = new RegExp(from, "i");
  if (to) query.to = new RegExp(to, "i");

  const flights = await Flight.find(query).sort({ createdAt: -1 });
  res.json(flights);
};

export const createFlight = async (req, res) => {
  const flight = await Flight.create({
    ...req.body,
    status: req.user.role === "admin" ? "approved" : "pending",
    submittedBy: req.user._id
  });
  res.status(201).json(flight);
};
