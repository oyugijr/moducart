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
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
