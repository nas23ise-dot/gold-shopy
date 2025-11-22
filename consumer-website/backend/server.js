const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Load passport configuration
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' 
    ? 'https://your-netlify-domain.netlify.app' 
    : 'http://localhost:3000'),
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.JWT_SECRET || 'goldshopsecret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB or use mock database
let useMockDb = process.env.USE_MOCK_DB === 'true';
let mockDb;

if (!useMockDb) {
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
} else {
  mockDb = require('./utils/mockDb');
  // Seed mock database with sample data
  mockDb.seedData();
}

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