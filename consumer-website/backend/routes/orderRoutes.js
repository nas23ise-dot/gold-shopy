const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../utils/authMiddleware');

// Create order (protected)
router.post('/', protect, orderController.createOrder);

// Get user orders (protected)
router.get('/myorders', protect, orderController.getUserOrders);

// Get order by ID (protected)
router.get('/:id', protect, orderController.getOrderById);

// Update order status (admin only)
router.put('/:id/status', protect, admin, orderController.updateOrderStatus);

module.exports = router;