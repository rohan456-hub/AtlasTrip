import express from "express";
import {
  createBooking,
  downloadReceipt,
  getAllBookings,
  getMyBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/mine", protect, getMyBookings);
router.get("/", protect, authorize("admin"), getAllBookings);
router.patch("/:id/status", protect, updateBookingStatus);
router.get("/:id/receipt", protect, downloadReceipt);

export default router;
