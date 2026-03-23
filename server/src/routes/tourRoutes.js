import express from "express";
import { createTour, getTours } from "../controllers/tourController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTours);
router.post("/", protect, authorize("admin", "agent"), createTour);

export default router;
