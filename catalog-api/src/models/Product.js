// src/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
}, { timestamps: true });

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
