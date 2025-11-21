const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const { category, material, minPrice, maxPrice, sortBy, page = 1, limit = 12 } = req.query;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      let filter = {};
      
      if (category) {
        filter.category = new RegExp(category, 'i');
      }
      
      if (material) {
        filter.material = new RegExp(material, 'i');
      }
      
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }
      
      const products = req.mockDb.getProducts(filter);
      
      // Apply sorting
      let sortedProducts = [...products];
      switch (sortBy) {
        case 'price-low':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          sortedProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
      }
      
      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
      
      return res.json({
        products: paginatedProducts,
        page: parseInt(page),
        pages: Math.ceil(products.length / limit),
        total: products.length
      });
    }
    
    // Build filter object for MongoDB
    let filter = {};
    
    if (category) {
      filter.category = new RegExp(category, 'i');
    }
    
    if (material) {
      filter.material = new RegExp(material, 'i');
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Build sort object
    let sort = {};
    switch (sortBy) {
      case 'price-low':
        sort.price = 1;
        break;
      case 'price-high':
        sort.price = -1;
        break;
      case 'rating':
        sort.rating = -1;
        break;
      case 'newest':
        sort.createdAt = -1;
        break;
      default:
        sort.createdAt = -1;
    }
    
    // Convert page and limit to numbers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    // Get products with pagination
    const products = await Product.find(filter)
      .sort(sort)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);
    
    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    
    res.json({
      products,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search products
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const filter = {
        $or: [
          { name: new RegExp(q, 'i') },
          { category: new RegExp(q, 'i') },
          { material: new RegExp(q, 'i') },
          { tags: new RegExp(q, 'i') }
        ]
      };
      
      const products = req.mockDb.getProducts(filter);
      return res.json(products);
    }
    
    // MongoDB search
    const products = await Product.find({
      $or: [
        { name: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') },
        { material: new RegExp(q, 'i') },
        { tags: new RegExp(q, 'i') }
      ]
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName, itemName } = req.params;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const filter = {
        category: new RegExp(itemName.replace(/s$/, ''), 'i'),
        material: new RegExp(categoryName.replace(/-/g, ' '), 'i')
      };
      
      const products = req.mockDb.getProducts(filter);
      return res.json(products);
    }
    
    // MongoDB query
    const products = await Product.find({
      category: new RegExp(itemName.replace(/s$/, ''), 'i'),
      material: new RegExp(categoryName.replace(/-/g, ' '), 'i')
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const product = req.mockDb.getProductById(parseInt(id)) || req.mockDb.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    }
    
    // MongoDB query
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProducts,
  searchProducts,
  getProductsByCategory,
  getProductById
};