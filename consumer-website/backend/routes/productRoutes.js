const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getProducts);

// Search products
router.get('/search', productController.searchProducts);

// Get products by category
router.get('/:categoryName/:itemName', productController.getProductsByCategory);

// Get product by ID
router.get('/:id', productController.getProductById);

module.exports = router;