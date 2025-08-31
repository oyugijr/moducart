const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const connectDB = require("../config/db");

dotenv.config();
connectDB();

const products = [
  {
    name: "Laptop",
    description: "15-inch display, 8GB RAM, 512GB SSD",
    price: 800,
    category: "Electronics",
    brand: "Dell",
    stock: 20,
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    name: "Phone",
    description: "5G, 128GB storage",
    price: 500,
    category: "Electronics",
    brand: "Samsung",
    stock: 50,
    imageUrl: "https://via.placeholder.com/150"
  }
];

const seed = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Sample products inserted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
