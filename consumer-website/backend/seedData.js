const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/goldshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    
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
      },
      {
        name: "Platinum Hoop Earrings",
        price: 195000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Earrings",
        category: "Earrings",
        material: "Platinum",
        rating: 4.6,
        reviews: 54,
        tags: ["contemporary", "everyday"]
      },
      {
        name: "Platinum Stud Earrings",
        price: 175000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Stud+Earrings",
        category: "Earrings",
        material: "Platinum",
        rating: 4.5,
        reviews: 67,
        tags: ["stud", "minimalist"]
      },
      {
        name: "Platinum Chain Necklace",
        price: 295000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Necklace",
        category: "Necklaces",
        material: "Platinum",
        rating: 4.5,
        reviews: 78,
        tags: ["minimalist", "versatile"]
      },
      {
        name: "Platinum Pendant Necklace",
        price: 325000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Pendant+Necklace",
        category: "Necklaces",
        material: "Platinum",
        rating: 4.6,
        reviews: 45,
        tags: ["pendant", "elegant"]
      },
      {
        name: "Platinum Cuff Bracelet",
        price: 420000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Bangle",
        category: "Bangles",
        material: "Platinum",
        rating: 4.8,
        reviews: 39,
        isNew: true,
        tags: ["statement", "modern"]
      },
      {
        name: "Platinum Tennis Bracelet",
        price: 395000,
        image: "https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Platinum+Tennis+Bracelet",
        category: "Bangles",
        material: "Platinum",
        rating: 4.7,
        reviews: 52,
        tags: ["tennis", "classic"]
      },
        
      // Silver Category
      {
        name: "Silver Statement Necklace",
        price: 25000,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Necklace",
        category: "Necklaces",
        material: "Silver",
        rating: 4.4,
        reviews: 123,
        tags: ["trendy", "affordable"]
      },
      {
        name: "Silver Pendant Necklace",
        price: 22000,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Pendant+Necklace",
        category: "Necklaces",
        material: "Silver",
        rating: 4.5,
        reviews: 87,
        tags: ["pendant", "versatile"]
      },
      {
        name: "Silver Drop Earrings",
        price: 12000,
        originalPrice: 15000,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Earrings",
        category: "Earrings",
        material: "Silver",
        rating: 4.3,
        reviews: 87,
        discount: 20,
        tags: ["casual", "lightweight"]
      },
      {
        name: "Silver Hoop Earrings",
        price: 15000,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Hoop+Earrings",
        category: "Earrings",
        material: "Silver",
        rating: 4.4,
        reviews: 64,
        tags: ["hoop", "trendy"]
      },
      {
        name: "Silver Ring Set",
        price: 18000,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Rings",
        category: "Rings",
        material: "Silver",
        rating: 4.5,
        reviews: 145,
        isBestseller: true,
        tags: ["set", "variety"]
      },
      {
        name: "Silver Promise Ring",
        price: 12000,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Promise+Ring",
        category: "Rings",
        material: "Silver",
        rating: 4.3,
        reviews: 78,
        tags: ["promise", "delicate"]
      },
      {
        name: "Silver Bangles Combo",
        price: 22000,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Bangles",
        category: "Bangles",
        material: "Silver",
        rating: 4.6,
        reviews: 98,
        tags: ["combo", "festive"]
      },
      {
        name: "Silver Cuff Bracelet",
        price: 25000,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Cuff+Bracelet",
        category: "Bangles",
        material: "Silver",
        rating: 4.5,
        reviews: 67,
        tags: ["cuff", "modern"]
      },
        
      // Coins & Bars Category
      {
        name: "10g Gold Coin",
        price: 45000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Coin",
        category: "Coins",
        material: "Gold",
        rating: 4.9,
        reviews: 210,
        isBestseller: true,
        tags: ["investment", "pure"]
      },
      {
        name: "5g Gold Coin",
        price: 22500,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=5g+Gold+Coin",
        category: "Coins",
        material: "Gold",
        rating: 4.8,
        reviews: 156,
        tags: ["investment", "small"]
      },
      {
        name: "100g Silver Bar",
        price: 8500,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Bar",
        category: "Bars",
        material: "Silver",
        rating: 4.7,
        reviews: 156,
        tags: ["investment", "bulk"]
      },
      {
        name: "50g Silver Bar",
        price: 4250,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=50g+Silver+Bar",
        category: "Bars",
        material: "Silver",
        rating: 4.6,
        reviews: 89,
        tags: ["investment", "medium"]
      },
      {
        name: "100g Gold Bar",
        price: 450000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Bar",
        category: "Bars",
        material: "Gold",
        rating: 4.8,
        reviews: 89,
        isNew: true,
        tags: ["investment", "high value"]
      },
      {
        name: "50g Gold Bar",
        price: 225000,
        image: "https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=50g+Gold+Bar",
        category: "Bars",
        material: "Gold",
        rating: 4.7,
        reviews: 67,
        tags: ["investment", "medium"]
      },
      {
        name: "5g Silver Coin",
        price: 3500,
        originalPrice: 4000,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=Silver+Coin",
        category: "Coins",
        material: "Silver",
        rating: 4.5,
        reviews: 134,
        discount: 13,
        tags: ["affordable", "collectible"]
      },
      {
        name: "1g Silver Coin",
        price: 700,
        image: "https://via.placeholder.com/400x400/C0C0C0/1F2937?text=1g+Silver+Coin",
        category: "Coins",
        material: "Silver",
        rating: 4.4,
        reviews: 98,
        tags: ["affordable", "entry"]
      }
    ];

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Create a sample admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@goldshop.com',
      password: 'admin123',
      isAdmin: true
    });
    console.log('Admin user created:', adminUser.name);

    // Create a sample regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@goldshop.com',
      password: 'john123',
      phone: '+91 9876543210'
    });
    console.log('Regular user created:', regularUser.name);

    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
});