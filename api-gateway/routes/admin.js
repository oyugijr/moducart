import express from "express";
import { renderDashboard, renderProducts, renderOrders } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, renderDashboard);
router.get("/products", protect, renderProducts);
router.get("/orders", protect, renderOrders);

export default router;
