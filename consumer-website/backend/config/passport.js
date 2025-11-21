const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const mockDb = require('../utils/mockDb');

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
  callbackURL: '/api/users/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this Google ID
    let user;
    
    // For mock database
    if (process.env.USE_MOCK_DB === 'true') {
      user = mockDb.findUser({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      // Check if user exists with the same email
      user = mockDb.findUser({ email: profile.emails[0].value });
      
      if (user) {
        // Update existing user with Google ID
        user = mockDb.updateUser(user._id, {
          googleId: profile.id,
          name: profile.displayName || user.name
        });
        return done(null, user);
      }
      
      // Create new user
      user = mockDb.createUser({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        password: 'google-auth', // Placeholder password for Google auth users
        loginAttempts: 0
      });
      
      return done(null, user);
    }
    
    // For MongoDB
    user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      return done(null, user);
    }
    
    // Check if user exists with the same email
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Update existing user with Google ID
      user.googleId = profile.id;
      user.name = profile.displayName || user.name;
      await user.save();
      return done(null, user);
    }
    
    // Create new user
    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      password: 'google-auth', // Placeholder password for Google auth users
      loginAttempts: 0
    });
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    let user;
    
    // For mock database
    if (process.env.USE_MOCK_DB === 'true') {
      user = mockDb.getUserById(id);
    } else {
      // For MongoDB
      user = await User.findById(id);
    }
    
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;