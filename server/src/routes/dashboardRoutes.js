import express from "express";
import { getDashboardStats, getMySubmissions } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDashboardStats);
router.get("/submissions", protect, getMySubmissions);

export default router;
