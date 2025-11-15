const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const logger = require("./utils/logger");
const { notFound, errorHandler } = require("./middlewares/");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => res.send("Catalog API Running"));
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Catalog API running on port ${PORT}`)
);
