const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a New Product
router.post('/', async (req, res) => {
    const { name, price, image, category, description, stock } = req.body;

    try {
        const newProduct = new Product({ name, price, image, category, description, stock });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Backend
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET);
    res.json({ token });
  });
  

module.exports = router;
