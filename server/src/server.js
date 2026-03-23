import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import Flight from "./models/Flight.js";
import Hotel from "./models/Hotel.js";
import Tour from "./models/Tour.js";
import User from "./models/User.js";
import { demoFlights, demoHotels, demoTours } from "./seedData.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim()).filter(Boolean)
  : null;

if (process.env.NODE_ENV === "production" && !process.env.MONGO_URI) {
  console.error("Server failed to start: MONGO_URI is not set");
  process.exit(1);
}

app.use(
  cors({
    origin(origin, callback) {
      if (!allowedOrigins) {
        return callback(null, true);
      }

      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/support", supportRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

const seedIfEmpty = async () => {
  const [flightCount, hotelCount, tourCount, admin] = await Promise.all([
    Flight.countDocuments(),
    Hotel.countDocuments(),
    Tour.countDocuments(),
    User.findOne({ email: "admin@travel.com" })
  ]);

  if (!flightCount) await Flight.insertMany(demoFlights);
  if (!hotelCount) await Hotel.insertMany(demoHotels);
  if (!tourCount) await Tour.insertMany(demoTours);

  if (!admin) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    await User.create({
      name: "Platform Admin",
      email: "admin@travel.com",
      password: hashedPassword,
      role: "admin",
      phone: "+1 555 014 777"
    });
  }
};

connectDb()
  .then(seedIfEmpty)
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server running on ${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server failed to start", error);
    process.exit(1);
  });
