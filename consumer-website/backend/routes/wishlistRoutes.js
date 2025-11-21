const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { protect } = require('../utils/authMiddleware');

// Get user wishlist (protected)
router.get('/', protect, wishlistController.getWishlist);

// Add item to wishlist (protected)
router.post('/add', protect, wishlistController.addToWishlist);

// Remove item from wishlist (protected)
router.delete('/remove', protect, wishlistController.removeFromWishlist);

// Move item from wishlist to cart (protected)
router.post('/move-to-cart', protect, wishlistController.moveFromWishlistToCart);

module.exports = router;