const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user cart
const getCart = async (req, res) => {
  try {
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const cart = req.mockDb.getCart(req.user.id);
      
      // Populate product details
      const populatedCart = {
        ...cart,
        items: cart.items.map(item => ({
          productId: req.mockDb.getProductById(item.productId),
          quantity: item.quantity
        }))
      };
      
      return res.json(populatedCart);
    }
    
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    
    if (!cart) {
      // Create a new empty cart if it doesn't exist
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      // Check if product exists
      const product = req.mockDb.getProductById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Add to cart
      const cart = req.mockDb.addToCart(req.user.id, productId, quantity);
      
      // Populate product details
      const populatedCart = {
        ...cart,
        items: cart.items.map(item => ({
          productId: req.mockDb.getProductById(item.productId),
          quantity: item.quantity
        }))
      };
      
      return res.json(populatedCart);
    }
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    
    if (existingItemIndex >= 0) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ productId, quantity });
    }
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const cart = req.mockDb.updateCartItem(req.user.id, productId, quantity);
      
      // Populate product details
      const populatedCart = {
        ...cart,
        items: cart.items.map(item => ({
          productId: req.mockDb.getProductById(item.productId),
          quantity: item.quantity
        }))
      };
      
      return res.json(populatedCart);
    }
    
    const cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const cart = req.mockDb.removeFromCart(req.user.id, productId);
      
      // Populate product details
      const populatedCart = {
        ...cart,
        items: cart.items.map(item => ({
          productId: req.mockDb.getProductById(item.productId),
          quantity: item.quantity
        }))
      };
      
      return res.json(populatedCart);
    }
    
    const cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => !item.productId.equals(productId));
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const cart = req.mockDb.clearCart(req.user.id);
      
      // Populate product details
      const populatedCart = {
        ...cart,
        items: cart.items.map(item => ({
          productId: req.mockDb.getProductById(item.productId),
          quantity: item.quantity
        }))
      };
      
      return res.json(populatedCart);
    }
    
    const cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = [];
    
    await cart.save();
    
    // Populate product details
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};