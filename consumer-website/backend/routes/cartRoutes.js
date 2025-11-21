const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../utils/authMiddleware');

// Get user cart (protected)
router.get('/', protect, cartController.getCart);

// Add item to cart (protected)
router.post('/add', protect, cartController.addToCart);

// Update cart item quantity (protected)
router.put('/update', protect, cartController.updateCartItem);

// Remove item from cart (protected)
router.delete('/remove', protect, cartController.removeFromCart);

// Clear cart (protected)
router.delete('/clear', protect, cartController.clearCart);

module.exports = router;