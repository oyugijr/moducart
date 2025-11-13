// src/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sku: { type: String, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    images: [{ type: String }],
    discountRefs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Discount" }],
    isActive: { type: Boolean, default: true },
    priceHistory: [
      {
        price: Number,
        changedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

// middleware: push price changes to history
productSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const update = this.getUpdate();
    if (update && update.price !== undefined) {
      // append to priceHistory using $push
      this.findOneAndUpdate({}, { $push: { priceHistory: { price: update.price, changedAt: new Date() } } });
    }
  } catch (e) {
    // ignore
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     description: { type: String },
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     brand: { type: String },
//     stock: { type: Number, required: true, default: 0 },
//     imageUrl: { type: String }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);
