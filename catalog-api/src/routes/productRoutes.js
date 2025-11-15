// src/routes/productRoutes.js
// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/productController");

// router.get("/", productController.getProducts);
// router.post("/", productController.createProduct);
// router.get("/:id", productController.getProductById);
// router.put("/:id", productController.updateProduct);
// router.delete("/:id", productController.deleteProduct);

// module.exports = router;

const express = require("express");
const { body, param } = require('express-validator');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock
} = require("../controllers/productController");

const router = express.Router();

// Validators for product create/update
const productValidators = [
  body('name').optional().isString().trim().notEmpty(),
  body('price').optional().isFloat({ min: 0 }),
  body('stock').optional().isInt({ min: 0 }),
  body('sku').optional().isString().trim()
];

router.route("/").get(getProducts).post(productValidators, createProduct);
router.route("/:id").get(getProduct).put(productValidators, updateProduct).delete(deleteProduct);

// Stock adjustment endpoint (atomic)
router.patch('/:id/stock', [param('id').isMongoId(), body('change').optional().isInt(), body('stock').optional().isInt()], adjustStock);

module.exports = router;
