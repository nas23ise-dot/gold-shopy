const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Get user wishlist
const getWishlist = async (req, res) => {
  try {
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const wishlist = req.mockDb.getWishlist(req.user.id);
      
      // Populate product details
      const populatedWishlist = {
        ...wishlist,
        productIds: wishlist.productIds.map(id => req.mockDb.getProductById(id)).filter(Boolean)
      };
      
      return res.json(populatedWishlist);
    }
    
    let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('productIds');
    
    if (!wishlist) {
      // Create a new empty wishlist if it doesn't exist
      wishlist = await Wishlist.create({ userId: req.user.id, productIds: [] });
    }
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add item to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      // Check if product exists
      const product = req.mockDb.getProductById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Add to wishlist
      const wishlist = req.mockDb.addToWishlist(req.user.id, productId);
      
      // Populate product details
      const populatedWishlist = {
        ...wishlist,
        productIds: wishlist.productIds.map(id => req.mockDb.getProductById(id)).filter(Boolean)
      };
      
      return res.json(populatedWishlist);
    }
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.user.id, productIds: [] });
    }
    
    // Check if item already exists in wishlist
    if (!wishlist.productIds.includes(productId)) {
      wishlist.productIds.push(productId);
      await wishlist.save();
    }
    
    // Populate product details
    await wishlist.populate('productIds');
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const wishlist = req.mockDb.removeFromWishlist(req.user.id, productId);
      
      // Populate product details
      const populatedWishlist = {
        ...wishlist,
        productIds: wishlist.productIds.map(id => req.mockDb.getProductById(id)).filter(Boolean)
      };
      
      return res.json(populatedWishlist);
    }
    
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    wishlist.productIds = wishlist.productIds.filter(id => id.toString() !== productId);
    
    await wishlist.save();
    
    // Populate product details
    await wishlist.populate('productIds');
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Move item from wishlist to cart
const moveFromWishlistToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const result = req.mockDb.moveFromWishlistToCart(req.user.id, productId);
      
      // Get updated wishlist
      const wishlist = req.mockDb.getWishlist(req.user.id);
      
      // Populate product details
      const populatedWishlist = {
        ...wishlist,
        productIds: wishlist.productIds.map(id => req.mockDb.getProductById(id)).filter(Boolean)
      };
      
      return res.json({
        ...result,
        wishlist: populatedWishlist
      });
    }
    
    // Remove from wishlist
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    wishlist.productIds = wishlist.productIds.filter(id => id.toString() !== productId);
    await wishlist.save();
    
    // Add to cart
    const Cart = require('../models/Cart');
    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    
    if (existingItemIndex >= 0) {
      // Update quantity
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.items.push({ productId, quantity: 1 });
    }
    
    await cart.save();
    
    // Populate product details
    await wishlist.populate('productIds');
    
    res.json({
      success: true,
      wishlist
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveFromWishlistToCart
};