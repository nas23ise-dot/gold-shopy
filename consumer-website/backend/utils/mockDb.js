// Mock database for development purposes when MongoDB is not available

class MockDB {
  constructor() {
    this.data = {
      users: [],
      products: [],
      carts: [],
      wishlists: [],
      orders: []
    };
    this.nextId = 1;
  }

  // Generate unique ID
  generateId() {
    return this.nextId++;
  }

  // Users
  createUser(userData) {
    const user = {
      _id: this.generateId(),
      ...userData,
      loginAttempts: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.data.users.push(user);
    return user;
  }

  findUser(query) {
    return this.data.users.find(user => {
      return Object.keys(query).every(key => {
        // Special handling for email search
        if (key === 'email') {
          return user[key] && user[key].toLowerCase() === query[key].toLowerCase();
        }
        return user[key] === query[key];
      });
    });
  }

  getUserById(id) {
    return this.data.users.find(user => user._id === id);
  }

  updateUser(id, updateData) {
    const userIndex = this.data.users.findIndex(user => user._id === id);
    if (userIndex !== -1) {
      this.data.users[userIndex] = {
        ...this.data.users[userIndex],
        ...updateData,
        updatedAt: new Date()
      };
      return this.data.users[userIndex];
    }
    return null;
  }

  // Check if account is locked
  isAccountLocked(user) {
    return !!(user.lockUntil && user.lockUntil > Date.now());
  }

  // Increment login attempts
  incLoginAttempts(userId) {
    const user = this.getUserById(userId);
    if (!user) return null;

    // Reset attempts and lock info if lock has expired
    if (user.lockUntil && user.lockUntil < Date.now()) {
      user.loginAttempts = 1;
      delete user.lockUntil;
      return user;
    }

    // Increment attempts
    user.loginAttempts = (user.loginAttempts || 0) + 1;

    // Lock account if we've reached max attempts and it's not already locked
    if (user.loginAttempts >= 5 && !this.isAccountLocked(user)) {
      user.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // Lock for 2 hours
    }

    user.updatedAt = new Date();
    return user;
  }

  // Reset login attempts
  resetLoginAttempts(userId) {
    const user = this.getUserById(userId);
    if (!user) return null;

    user.loginAttempts = 0;
    delete user.lockUntil;
    user.updatedAt = new Date();
    return user;
  }

  // Generate remember me token
  generateRememberToken(userId) {
    const user = this.getUserById(userId);
    if (!user) return null;

    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setDate(expires.getDate() + 30); // Token expires in 30 days

    user.rememberToken = token;
    user.rememberTokenExpires = expires;
    user.updatedAt = new Date();

    return { token, expires };
  }

  // Find user by remember token
  findUserByRememberToken(token) {
    return this.data.users.find(user => 
      user.rememberToken === token && 
      user.rememberTokenExpires && 
      user.rememberTokenExpires > Date.now()
    );
  }

  // Products
  createProduct(productData) {
    const product = {
      _id: this.generateId(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.data.products.push(product);
    return product;
  }

  getProducts(query = {}) {
    return this.data.products.filter(product => {
      return Object.keys(query).every(key => {
        if (key === 'price') {
          // Handle price range queries
          if (query[key].$gte !== undefined && query[key].$lte !== undefined) {
            return product[key] >= query[key].$gte && product[key] <= query[key].$lte;
          }
          if (query[key].$gte !== undefined) {
            return product[key] >= query[key].$gte;
          }
          if (query[key].$lte !== undefined) {
            return product[key] <= query[key].$lte;
          }
        }
        if (typeof query[key] === 'string' && query[key].startsWith('/')) {
          // Handle regex queries
          const regex = new RegExp(query[key].slice(1, -1), 'i');
          return regex.test(product[key]);
        }
        return product[key] === query[key];
      });
    });
  }

  getProductById(id) {
    return this.data.products.find(product => product._id === id);
  }

  // Carts
  getCart(userId) {
    let cart = this.data.carts.find(c => c.userId === userId);
    if (!cart) {
      cart = {
        _id: this.generateId(),
        userId,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.data.carts.push(cart);
    }
    return cart;
  }

  addToCart(userId, productId, quantity = 1) {
    const cart = this.getCart(userId);
    const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
    
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity
      });
    }
    
    cart.updatedAt = new Date();
    return cart;
  }

  updateCartItem(userId, productId, quantity) {
    const cart = this.getCart(userId);
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    
    if (itemIndex !== -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      cart.updatedAt = new Date();
    }
    
    return cart;
  }

  removeFromCart(userId, productId) {
    const cart = this.getCart(userId);
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    
    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
      cart.updatedAt = new Date();
    }
    
    return cart;
  }

  clearCart(userId) {
    const cart = this.getCart(userId);
    cart.items = [];
    cart.updatedAt = new Date();
    return cart;
  }

  // Wishlists
  getWishlist(userId) {
    let wishlist = this.data.wishlists.find(w => w.userId === userId);
    if (!wishlist) {
      wishlist = {
        _id: this.generateId(),
        userId,
        productIds: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.data.wishlists.push(wishlist);
    }
    return wishlist;
  }

  addToWishlist(userId, productId) {
    const wishlist = this.getWishlist(userId);
    if (!wishlist.productIds.includes(productId)) {
      wishlist.productIds.push(productId);
      wishlist.updatedAt = new Date();
    }
    return wishlist;
  }

  removeFromWishlist(userId, productId) {
    const wishlist = this.getWishlist(userId);
    const index = wishlist.productIds.indexOf(productId);
    if (index !== -1) {
      wishlist.productIds.splice(index, 1);
      wishlist.updatedAt = new Date();
    }
    return wishlist;
  }

  moveFromWishlistToCart(userId, productId) {
    // Remove from wishlist
    this.removeFromWishlist(userId, productId);
    // Add to cart
    this.addToCart(userId, productId);
    return { success: true };
  }

  // Orders
  createOrder(orderData) {
    const order = {
      _id: this.generateId(),
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.data.orders.push(order);
    return order;
  }

  getUserOrders(userId) {
    return this.data.orders.filter(order => order.userId === userId);
  }

  getOrderById(id) {
    return this.data.orders.find(order => order._id === id);
  }

  updateOrderStatus(id, status) {
    const orderIndex = this.data.orders.findIndex(order => order._id === id);
    if (orderIndex !== -1) {
      this.data.orders[orderIndex].status = status;
      this.data.orders[orderIndex].updatedAt = new Date();
      return this.data.orders[orderIndex];
    }
    return null;
  }

  // Seed initial data
  seedData() {
    // Clear existing data
    this.data = {
      users: [],
      products: [],
      carts: [],
      wishlists: [],
      orders: []
    };

    // Sample products data
    const products = [
      // Gold Category
      {
        name: "Classic Gold Chain Necklace",
        price: 185000,
        originalPrice: 220000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Chain",
        category: "Necklaces",
        material: "Gold",
        rating: 4.8,
        reviews: 124,
        discount: 16,
        isBestseller: true,
        tags: ["classic", "everyday", "gifting"]
      },
      {
        name: "Elegant Gold Pendant Necklace",
        price: 155000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Pendant+Necklace",
        category: "Necklaces",
        material: "Gold",
        rating: 4.7,
        reviews: 96,
        isNew: true,
        tags: ["elegant", "statement"]
      },
      {
        name: "Elegant Gold Earrings",
        price: 65000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Earrings",
        category: "Earrings",
        material: "Gold",
        rating: 4.6,
        reviews: 89,
        tags: ["elegant", "daily wear"]
      },
      {
        name: "Gold Drop Earrings",
        price: 75000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Drop+Earrings",
        category: "Earrings",
        material: "Gold",
        rating: 4.5,
        reviews: 72,
        tags: ["drop", "lightweight"]
      },
      {
        name: "Traditional Gold Bangles",
        price: 125000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Bangles",
        category: "Bangles",
        material: "Gold",
        rating: 4.7,
        reviews: 156,
        isNew: true,
        tags: ["traditional", "festive"]
      },
      {
        name: "Gold Cuff Bangles",
        price: 145000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Cuff+Bangles",
        category: "Bangles",
        material: "Gold",
        rating: 4.6,
        reviews: 87,
        tags: ["cuff", "modern"]
      },
      {
        name: "Rose Gold Wedding Band",
        price: 315000,
        image: "https://via.placeholder.com/400x400/E11D48/FFFFFF?text=Rose+Gold+Ring",
        category: "Rings",
        material: "Rose Gold",
        rating: 4.8,
        reviews: 203,
        isNew: true,
        tags: ["wedding", "romantic", "trending"]
      },
      {
        name: "Gold Promise Ring",
        price: 85000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Promise+Ring",
        category: "Rings",
        material: "Gold",
        rating: 4.4,
        reviews: 64,
        tags: ["promise", "delicate"]
      },
      {
        name: "Gold Pendant with Diamond",
        price: 95000,
        originalPrice: 110000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Pendant",
        category: "Pendants",
        material: "Gold",
        rating: 4.5,
        reviews: 76,
        discount: 14,
        tags: ["delicate", "versatile"]
      },
      {
        name: "Heart Shaped Gold Pendant",
        price: 115000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Heart+Gold+Pendant",
        category: "Pendants",
        material: "Gold",
        rating: 4.7,
        reviews: 103,
        tags: ["heart", "romantic"]
      },
        
      // Diamond Category
      {
        name: "Diamond Solitaire Ring",
        price: 675000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Ring",
        category: "Rings",
        material: "Diamond",
        rating: 4.9,
        reviews: 87,
        isBestseller: true,
        tags: ["engagement", "luxury", "certified"]
      },
      {
        name: "Diamond Halo Ring",
        price: 725000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Halo+Ring",
        category: "Rings",
        material: "Diamond",
        rating: 4.8,
        reviews: 64,
        tags: ["halo", "luxury"]
      },
      {
        name: "Diamond Tennis Necklace",
        price: 550000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Necklace",
        category: "Necklaces",
        material: "Diamond",
        rating: 4.7,
        reviews: 64,
        tags: ["elegant", "evening wear"]
      },
      {
        name: "Diamond Pendant Necklace",
        price: 485000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Pendant+Necklace",
        category: "Necklaces",
        material: "Diamond",
        rating: 4.6,
        reviews: 78,
        tags: ["pendant", "versatile"]
      },
      {
        name: "Diamond Stud Earrings",
        price: 295000,
        originalPrice: 350000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Earrings",
        category: "Earrings",
        material: "Diamond",
        rating: 4.6,
        reviews: 112,
        discount: 16,
        tags: ["classic", "timeless"]
      },
      {
        name: "Diamond Hoop Earrings",
        price: 325000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Hoop+Earrings",
        category: "Earrings",
        material: "Diamond",
        rating: 4.7,
        reviews: 89,
        tags: ["hoop", "trendy"]
      },
      {
        name: "Diamond Bangle Set",
        price: 780000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Bangles",
        category: "Bangles",
        material: "Diamond",
        rating: 4.8,
        reviews: 43,
        isNew: true,
        tags: ["luxury", "statement"]
      },
      {
        name: "Diamond Tennis Bracelet",
        price: 695000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Bracelet",
        category: "Bangles",
        material: "Diamond",
        rating: 4.7,
        reviews: 56,
        tags: ["tennis", "elegant"]
      },
      {
        name: "Diamond Pendant Necklace",
        price: 425000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Pendant",
        category: "Pendants",
        material: "Diamond",
        rating: 4.5,
        reviews: 91,
        tags: ["versatile", "special occasion"]
      },
      {
        name: "Diamond Heart Pendant",
        price: 395000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Heart+Pendant",
        category: "Pendants",
        material: "Diamond",
        rating: 4.6,
        reviews: 74,
        tags: ["heart", "romantic"]
      },
        
      // Platinum Category
      {
        name: "Platinum Engagement Ring",
        price: 380000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Ring",
        category: "Rings",
        material: "Platinum",
        rating: 4.7,
        reviews: 67,
        tags: ["modern", "durable"]
      },
      {
        name: "Platinum Wedding Band",
        price: 295000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Wedding+Band",
        category: "Rings",
        material: "Platinum",
        rating: 4.6,
        reviews: 89,
        tags: ["wedding", "classic"]
      }
    ];

    // Insert products
    products.forEach(product => this.createProduct(product));

    // Create sample users with hashed passwords
    const bcrypt = require('bcryptjs');
    
    // Hash passwords before creating users
    const salt = bcrypt.genSaltSync(10);
    const adminPassword = bcrypt.hashSync('Admin123!', salt);
    const johnPassword = bcrypt.hashSync('John123!', salt);
    
    this.createUser({
      name: 'Admin User',
      email: 'admin@goldshop.com',
      password: adminPassword,
      isAdmin: true
    });

    this.createUser({
      name: 'John Doe',
      email: 'john@goldshop.com',
      password: johnPassword,
      phone: '+91 9876543210'
    });

    console.log('Mock database seeded with sample data');
    return true;
  }
}

// Export singleton instance
module.exports = new MockDB();