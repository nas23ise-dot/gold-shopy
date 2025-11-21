const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('dotenv').config();

// Load passport configuration
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Connect to MongoDB or use mock database
let useMockDb = false;
let mockDb;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/goldshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => {
  console.log('MongoDB connection failed, using mock database instead');
  useMockDb = true;
  mockDb = require('./utils/mockDb');
  // Seed mock database with sample data
  mockDb.seedData();
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Make useMockDb available to controllers and middleware
app.use((req, res, next) => {
  req.useMockDb = useMockDb;
  req.mockDb = mockDb;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Gold Shop Backend API', 
    database: useMockDb ? 'Mock Database' : 'MongoDB',
    status: 'Running'
  });
});

// Product routes
app.use('/api/products', require('./routes/productRoutes'));

// User routes
app.use('/api/users', require('./routes/userRoutes'));

// Cart routes
app.use('/api/cart', require('./routes/cartRoutes'));

// Order routes
app.use('/api/orders', require('./routes/orderRoutes'));

// Wishlist routes
app.use('/api/wishlist', require('./routes/wishlistRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Database: ${useMockDb ? 'Mock Database (No MongoDB required)' : 'MongoDB'}`);
});