import { Request, Response } from "express";
import { DiscountService } from "../services/discountService";

export const getDiscount = async (req: Request, res: Response) => {
  try {
    const discount = await DiscountService.getDiscount(req.params.productId);
    if (!discount) return res.status(404).json({ message: "Discount not found" });
    res.json(discount);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createDiscount = async (req: Request, res: Response) => {
  try {
    const { productId, discountPercentage, description } = req.body;
    const discount = await DiscountService.createDiscount(productId, discountPercentage, description);
    res.status(201).json(discount);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllDiscounts = async (_req: Request, res: Response) => {
  try {
    const discounts = await DiscountService.getAllDiscounts();
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
