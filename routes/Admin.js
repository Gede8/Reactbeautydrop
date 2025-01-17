const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Mongoose Product model
const Order = require('../models/Order'); // Mongoose Order model
const { verifyAdmin } = require('../middleware/auth'); // Middleware for admin auth

// Add a new product
router.post('/products', verifyAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
});

// Get all products
router.get('/products', verifyAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Update a product
router.put('/products/:id', verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Delete a product
router.delete('/products/:id', verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// View orders
router.get('/orders', verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId'); // Populate user details if needed
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Update order status
router.put('/orders/:id', verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
});

module.exports = router;
