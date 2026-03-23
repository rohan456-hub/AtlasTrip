import express from "express";
import { createHotel, getHotels } from "../controllers/hotelController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getHotels);
router.post("/", protect, authorize("admin", "agent"), createHotel);

export default router;
