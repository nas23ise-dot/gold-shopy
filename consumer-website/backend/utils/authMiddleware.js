const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

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
      // Handle both numeric IDs (from mock database) and ObjectId strings (from MongoDB)
      let userId = decoded.id;
      if (typeof userId === 'number' || (typeof userId === 'string' && !mongoose.Types.ObjectId.isValid(userId))) {
        // If it's a numeric ID or an invalid ObjectId string, try to find by googleId or other means
        // For now, we'll just return an error since we can't properly look up the user
        res.status(401).json({ message: 'Not authorized, token failed - invalid user ID format' });
        return;
      }
      
      req.user = await User.findById(userId).select('-password');
      
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