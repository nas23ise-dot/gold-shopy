const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'goldshopsecret');
      
      if (req.useMockDb && req.mockDb) {
        // Use mock database
        req.user = {
          id: decoded.id
        };
        next();
        return;
      }
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }
  
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.useMockDb && req.mockDb) {
    // For mock database, check if user is admin
    // In a real implementation, you would check the user's admin status
    // For now, we'll assume the user is not admin in mock mode
    res.status(403).json({ message: 'Not authorized as admin (mock mode)' });
    return;
  }
  
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { protect, admin };