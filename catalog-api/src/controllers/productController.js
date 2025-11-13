const Product = require("../models/Product");
const { validationResult } = require('express-validator');
const rabbit = require('../utils/rabbitmq');

const STOCK_QUEUE = process.env.PRODUCT_STOCK_QUEUE || 'product.stock';

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // If price provided, perform atomic update that also pushes to priceHistory
    const updateDoc = {};
    const hasPrice = Object.prototype.hasOwnProperty.call(req.body, 'price');
    if (hasPrice) {
      updateDoc.$set = { ...req.body };
      updateDoc.$push = { priceHistory: { price: req.body.price, changedAt: new Date() } };
    } else {
      updateDoc.$set = { ...req.body };
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateDoc, {
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

// @desc Adjust stock atomically and publish event
// @route PATCH /api/products/:id/stock
exports.adjustStock = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const id = req.params.id;
    const { change, stock } = req.body; // change: delta, stock: absolute

    const before = await Product.findById(id);
    if (!before) return res.status(404).json({ message: 'Product not found' });

    let updated;
    if (typeof change === 'number') {
      // increment/decrement atomically
      updated = await Product.findByIdAndUpdate(id, { $inc: { stock: change } }, { new: true });
    } else if (typeof stock === 'number') {
      updated = await Product.findByIdAndUpdate(id, { $set: { stock } }, { new: true });
    } else {
      return res.status(400).json({ message: 'Either `change` (int) or `stock` (int) must be provided' });
    }

    // publish stock change event (best-effort)
    const delta = updated.stock - (before.stock || 0);
    const payload = { productId: id, change: delta, newStock: updated.stock, timestamp: new Date() };
    rabbit.publish(STOCK_QUEUE, payload).catch(() => { });

    return res.json({ ok: true, product: updated });
  } catch (err) {
    next(err);
  }
};
