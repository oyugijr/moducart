// import express from "express";
// import { renderDashboard, renderProducts, renderOrders } from "../controllers/adminController.js";
// import { protect } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.get("/dashboard", protect, renderDashboard);
// router.get("/products", protect, renderProducts);
// router.get("/orders", protect, renderOrders);

// export default router;

import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  renderDashboard,
  renderManageProducts,
  renderManageOrders,
  renderManageUsers,
  renderSettings,
  renderReports
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, renderDashboard);
router.get("/manage-products", protect, renderManageProducts);
router.get("/manage-orders", protect, renderManageOrders);
router.get("/manage-users", protect, renderManageUsers);
router.get("/settings", protect, renderSettings);
router.get("/reports", protect, renderReports);

export default router;
