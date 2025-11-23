const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ 
    id: user._id, 
    name: user.name,
    email: user.email 
  }, process.env.JWT_SECRET || 'goldshopsecret', {
    expiresIn: '30d'
  });
};

// Generate short-lived token for remember me
const generateRememberMeToken = (user) => {
  return jwt.sign({ 
    id: user._id, 
    name: user.name,
    email: user.email 
  }, process.env.JWT_SECRET || 'goldshopsecret', {
    expiresIn: '30d' // 30 days for remember me
  });
};

// Set JWT token as HTTP-only cookie
const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  };
  
  res.cookie('token', token, cookieOptions);
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    
    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
    }
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      // Check if user already exists
      const userExists = req.mockDb.findUser({ email });
      
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create user
      const user = req.mockDb.createUser({
        name,
        email,
        password: hashedPassword,
        phone,
        isAdmin: false,
        loginAttempts: 0
      });
      
      // Generate token
      const token = generateToken(user);
      
      // Set remember me cookie if requested
      if (req.body.rememberMe) {
        const rememberTokenData = generateRememberMeToken(user);
        setTokenCookie(res, token);
      }
      
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token
      });
    }
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      loginAttempts: 0
    });
    
    if (user) {
      // Generate token
      const token = generateToken(user);
      
      // Set remember me cookie if requested
      if (req.body.rememberMe) {
        const rememberTokenData = generateRememberMeToken(user);
        setTokenCookie(res, token);
      }
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const user = req.mockDb.findUser({ email });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      // Check if account is locked
      if (req.mockDb.isAccountLocked(user)) {
        return res.status(401).json({ message: 'Account is locked due to too many failed login attempts. Please try again later.' });
      }
      
      if (await bcrypt.compare(password, user.password)) {
        // Reset login attempts on successful login
        req.mockDb.resetLoginAttempts(user._id);
        
        // Generate token
        const token = generateToken(user);
        
        // Set remember me cookie if requested
        if (rememberMe) {
          const rememberTokenData = generateRememberMeToken(user);
          setTokenCookie(res, token);
        }
        
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
          token
        });
      } else {
        // Increment login attempts on failed login
        req.mockDb.incLoginAttempts(user._id);
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }
    
    // MongoDB query
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check if account is locked
    if (user.isAccountLocked()) {
      return res.status(401).json({ message: 'Account is locked due to too many failed login attempts. Please try again later.' });
    }
    
    if (await bcrypt.compare(password, user.password)) {
      // Reset login attempts on successful login
      await user.resetLoginAttempts();
      
      // Generate token
      const token = generateToken(user);
      
      // Set remember me cookie if requested
      if (rememberMe) {
        const rememberTokenData = generateRememberMeToken(user);
        setTokenCookie(res, token);
      }
      
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token
      });
    } else {
      // Increment login attempts on failed login
      await user.incLoginAttempts();
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Google OAuth authentication
const googleAuth = (req, res, next) => {
  console.log('Google OAuth authentication initiated');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

// Google OAuth callback
const googleAuthCallback = (req, res, next) => {
  console.log('Google OAuth callback called');
  passport.authenticate('google', async (err, user, info) => {
    console.log('Google OAuth authenticate callback called', { 
      err: err ? err.message : null, 
      hasUser: !!user, 
      userId: user?._id,
      info 
    });
    
    if (err) {
      console.error('Google OAuth error:', err);
      console.error('Error stack:', err.stack);
      // Redirect to frontend with error
      const frontendUrl = process.env.NODE_ENV === 'production' 
        ? (process.env.FRONTEND_URL || 'https://shiva-gold-diamond.netlify.app')
        : (process.env.FRONTEND_URL || 'http://localhost:3000');
      return res.redirect(`${frontendUrl}/auth/signin?error=${encodeURIComponent(err.message || 'Unknown error')}`);
    }
    
    if (!user) {
      console.error('Google OAuth failed: No user returned');
      console.error('Info object:', info);
      // Redirect to frontend with error
      const frontendUrl = process.env.NODE_ENV === 'production' 
        ? (process.env.FRONTEND_URL || 'https://shiva-gold-diamond.netlify.app')
        : (process.env.FRONTEND_URL || 'http://localhost:3000');
      return res.redirect(`${frontendUrl}/auth/signin?error=Authentication failed - No user returned`);
    }
    
    console.log('Google OAuth successful, user:', user);
    // Generate token
    const token = generateToken(user);
    
    // Set cookie
    setTokenCookie(res, token);
    
    // Redirect to frontend with token
    const frontendUrl = process.env.NODE_ENV === 'production' 
      ? (process.env.FRONTEND_URL || 'https://shiva-gold-diamond.netlify.app')
      : (process.env.FRONTEND_URL || 'http://localhost:3000');
    res.redirect(`${frontendUrl}/auth/google-callback?token=${token}`);
  })(req, res, next);
};

// Remember me login
const rememberMeLogin = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'No remember me token provided' });
    }
    
    if (req.useMockDb && req.mockDb) {
      // For mock database, we'll just validate the JWT token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'goldshopsecret');
        
        const user = req.mockDb.getUserById(decoded.id);
        if (!user) {
          return res.status(401).json({ message: 'Invalid token' });
        }
        
        // Generate a new token
        const newToken = generateToken(user);
        
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
          token: newToken
        });
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
    
    // For MongoDB, verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'goldshopsecret');
      
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      // Generate a new token
      const newToken = generateToken(user);
      
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: newToken
      });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const user = req.mockDb.getUserById(req.user.id);
      
      if (user) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin
        });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    }
    
    // MongoDB query
    const user = await User.findById(req.user.id);
    
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    if (req.useMockDb && req.mockDb) {
      // Use mock database
      const user = req.mockDb.getUserById(req.user.id);
      
      if (user) {
        // Update user data
        const updatedUser = req.mockDb.updateUser(req.user.id, {
          name: req.body.name || user.name,
          email: req.body.email || user.email,
          phone: req.body.phone || user.phone
        });
        
        return res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          isAdmin: updatedUser.isAdmin,
          token: req.headers.authorization?.split(' ')[1] || generateToken(updatedUser)
        });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    }
    
    // MongoDB query
    const user = await User.findById(req.user.id);
    
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      
      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
        token: req.headers.authorization?.split(' ')[1] || generateToken(updatedUser)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  googleAuth,
  googleAuthCallback,
  rememberMeLogin,
  getUserProfile,
  updateUserProfile,
  generateToken
};