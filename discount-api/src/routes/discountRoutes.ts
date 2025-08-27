import { Router } from "express";
import { getDiscount, createDiscount, getAllDiscounts } from "../controllers/discountController";

const router = Router();

router.get("/", getAllDiscounts);
router.get("/:productId", getDiscount);
router.post("/", createDiscount);

export default router;
