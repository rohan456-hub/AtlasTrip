import express from "express";
import { createFlight, getFlights } from "../controllers/flightController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getFlights);
router.post("/", protect, authorize("admin", "agent"), createFlight);

export default router;
