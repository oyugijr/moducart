import express from "express";
import { proxyCatalogProducts, proxyCatalogProductById } from "../controllers/productController.js";
import { createOrderProxy, listOrdersProxy } from "../controllers/orderController.js";

const router = express.Router();

// Catalog proxies
router.get("/catalog/products", proxyCatalogProducts);
router.get("/catalog/products/:id", proxyCatalogProductById);

// Ordering proxies
router.post("/orders", createOrderProxy);
router.get("/orders", listOrdersProxy);

export default router;
