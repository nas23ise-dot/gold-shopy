const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create order
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      // Validate items
      if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Order must contain at least one item' });
      }
      
      // Validate total amount
      if (!totalAmount || totalAmount <= 0) {
        return res.status(400).json({ message: 'Invalid total amount' });
      }
      
      // Validate shipping address
      if (!shippingAddress) {
        return res.status(400).json({ message: 'Shipping address is required' });
      }
      
      // Validate payment method
      if (!paymentMethod) {
        return res.status(400).json({ message: 'Payment method is required' });
      }
      
      // Create order items with price at time of purchase
      const orderItems = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }));
      
      // Create order
      const order = req.mockDb.createOrder({
        userId: req.user.id,
        items: orderItems,
        totalAmount,
        shippingAddress,
        paymentMethod,
        paymentStatus: 'pending',
        status: 'pending'
      });
      
      // Clear user's cart
      req.mockDb.clearCart(req.user.id);
      
      return res.status(201).json(order);
    }
    
    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }
    
    // Validate total amount
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }
    
    // Validate shipping address
    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }
    
    // Validate payment method
    if (!paymentMethod) {
      return res.status(400).json({ message: 'Payment method is required' });
    }
    
    // Create order items with price at time of purchase
    const orderItems = items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    }));
    
    // Create order
    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      status: 'pending'
    });
    
    // Clear user's cart
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const orders = req.mockDb.getUserOrders(req.user.id);
      return res.json(orders);
    }
    
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const order = req.mockDb.getOrderById(id);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Check if user owns this order
      if (order.userId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to view this order' });
      }
      
      return res.json(order);
    }
    
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user owns this order
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const order = req.mockDb.updateOrderStatus(id, status);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      return res.json(order);
    }
    
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = status;
    const updatedOrder = await order.save();
    
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
};