const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../utils/authMiddleware');

// Register user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Logout user
router.post('/logout', userController.logoutUser);

// Google OAuth routes
router.get('/auth/google', userController.googleAuth);
router.get('/auth/google/callback', userController.googleAuthCallback);

// Remember me login
router.post('/remember-me', userController.rememberMeLogin);

// Get user profile (protected)
router.get('/profile', protect, userController.getUserProfile);

// Update user profile (protected)
router.put('/profile', protect, userController.updateUserProfile);

module.exports = router;