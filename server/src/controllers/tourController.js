import Tour from "../models/Tour.js";

export const getTours = async (req, res) => {
  const { destination } = req.query;
  const query =
    req.user?.role === "admin"
      ? {}
      : { $or: [{ status: "approved" }, { status: { $exists: false } }] };
  if (destination) query.destination = new RegExp(destination, "i");
  const tours = await Tour.find(query).sort({ createdAt: -1 });
  res.json(tours);
};

export const createTour = async (req, res) => {
  const tour = await Tour.create({
    ...req.body,
    status: req.user.role === "admin" ? "approved" : "pending",
    submittedBy: req.user._id
  });
  res.status(201).json(tour);
};
