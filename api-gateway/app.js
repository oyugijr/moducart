import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import indexRoutes from "./routes/index.js";
import productRoutes from "./routes/products.js";
import basketRoutes from "./routes/basket.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();
const app = express();

// ESM path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'API Gateway',
    timestamp: new Date().toISOString(),
    message: 'API Gateway is running successfully!'
  });
});

// Routes
app.use("/", indexRoutes);
app.use("/products", productRoutes);
app.use("/basket", basketRoutes);
app.use("/orders", orderRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));