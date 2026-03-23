import express from "express";
import { getPendingInventory, reviewInventory } from "../controllers/adminController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/pending", protect, authorize("admin"), getPendingInventory);
router.patch("/review/:type/:id", protect, authorize("admin"), reviewInventory);

export default router;
