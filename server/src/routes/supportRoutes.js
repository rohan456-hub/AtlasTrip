import express from "express";
import {
  createComplaint,
  getComplaints,
  updateComplaintStatus
} from "../controllers/supportController.js";
import { authorize, optionalProtect, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/complaints", optionalProtect, createComplaint);
router.get("/complaints", protect, authorize("admin"), getComplaints);
router.patch("/complaints/:id", protect, authorize("admin"), updateComplaintStatus);

export default router;
