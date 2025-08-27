import { Discount } from "../models/Discount";

export class DiscountService {
  static async getDiscount(productId: string) {
    return Discount.findOne({ where: { productId } });
  }

  static async createDiscount(productId: string, discountPercentage: number, description: string) {
    return Discount.create({ productId, discountPercentage, description });
  }

  static async getAllDiscounts() {
    return Discount.findAll();
  }
}
