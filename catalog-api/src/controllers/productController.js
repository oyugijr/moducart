const Product = require("../models/Product");

// @desc   Get all products (with pagination + filter)
// @route  GET /api/products
exports.getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };

    // by default exclude soft-deleted products
    if (query.isActive === undefined) query.isActive = true;
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get single product
// @route  GET /api/products/:id
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.isActive === false) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// @desc   Create new product
// @route  POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    // initialize price history
    if (product.price !== undefined) {
      product.priceHistory = [{ price: product.price, changedAt: new Date() }];
    }
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// @desc   Update product
// @route  PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    // If updating stock or price, record/handle appropriately
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// @desc   Delete product
// @route  DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    // Soft delete: mark isActive = false
    const prod = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!prod) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deactivated" });
  } catch (err) {
    next(err);
  }
};
