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
// CORS configuration
const allowedOrigins = [
  'https://gold-jewelry-shopy.netlify.app',
  'http://localhost:3000',
  'http://localhost:3001'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200
};

// Handle preflight requests
app.options('*', cors(corsOptions));
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
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('USE_MOCK_DB:', process.env.USE_MOCK_DB);

// Force MongoDB usage in production environment - make it very explicit
const isProduction = process.env.NODE_ENV === 'production';
let useMockDb = false; // Force to false to always try MongoDB first
console.log('isProduction:', isProduction);
console.log('useMockDb forced to:', useMockDb);

let mockDb;

if (!useMockDb) {
  // Use MongoDB Atlas connection string with environment variable for password
  const mongoPassword = process.env.MONGODB_PASSWORD || 'mxapeoU76lMygfBQ'; // Fallback to your actual password
  const mongoUri = process.env.MONGODB_URI || `mongodb+srv://Gold-shop:${mongoPassword}@cluster0.ela5ylc.mongodb.net/goldshop?retryWrites=true&w=majority`;
  console.log('Attempting MongoDB connection with URI:', mongoUri);
  
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connection successful');
  }).catch(err => {
    console.log('MongoDB connection failed, using mock database instead');
    console.error('MongoDB connection error:', err);
    useMockDb = true;
    mockDb = require('./utils/mockDb');
    // Seed mock database with sample data
    mockDb.seedData();
  });
} else {
  console.log('Using mock database by configuration');
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: useMockDb ? 'mock' : 'mongodb'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Database: ${useMockDb ? 'Mock Database (No MongoDB required)' : 'MongoDB'}`);
});