const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/User');
const mockDb = require('../utils/mockDb');

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || (process.env.NODE_ENV === 'production' 
    ? process.env.BACKEND_URL + '/api/users/auth/google/callback'
    : 'http://localhost:5000/api/users/auth/google/callback')
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google OAuth profile received:', profile);
    
    // Validate profile has required fields
    if (!profile || !profile.id) {
      return done(new Error('Invalid Google profile: missing ID'), null);
    }
    
    if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
      return done(new Error('Invalid Google profile: missing email'), null);
    }
    
    // Check if user already exists with this Google ID
    let user;
    
    // For mock database
    if (process.env.USE_MOCK_DB === 'true') {
      console.log('Using mock database');
      user = mockDb.findUser({ googleId: profile.id });
      
      if (user) {
        console.log('Found existing user with Google ID:', user);
        return done(null, user);
      }
      
      // Check if user exists with the same email
      user = mockDb.findUser({ email: profile.emails[0].value });
      
      if (user) {
        console.log('Found existing user with email, updating with Google ID:', user);
        // Update existing user with Google ID
        user = mockDb.updateUser(user._id, {
          googleId: profile.id,
          name: profile.displayName || user.name
        });
        return done(null, user);
      }
      
      // Create new user
      console.log('Creating new user with Google profile:', profile);
      user = mockDb.createUser({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        password: 'GoogleAuth123!', // Placeholder password for Google auth users
        loginAttempts: 0
      });
      
      console.log('Created new user:', user);
      return done(null, user);
    }
    
    // For MongoDB
    console.log('Using MongoDB');
    user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      console.log('Found existing user with Google ID:', user);
      return done(null, user);
    }
    
    // Check if user exists with the same email
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      console.log('Found existing user with email, updating with Google ID:', user);
      // Update existing user with Google ID
      user.googleId = profile.id;
      user.name = profile.displayName || user.name;
      await user.save();
      return done(null, user);
    }
    
    // Create new user
    console.log('Creating new user with Google profile:', profile);
    try {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        // Password not required for Google OAuth users
        loginAttempts: 0
      });
      
      console.log('Created new user:', user);
      return done(null, user);
    } catch (createError) {
      console.error('Error creating user in MongoDB:', createError);
      // If user creation fails due to validation, try to get the user
      if (createError.code === 11000) {
        // Duplicate key error - user might have been created in another request
        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          // Update with Google ID if not already set
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }
      }
      return done(createError, null);
    }
  } catch (error) {
    console.error('Error in Google OAuth strategy:', error);
    return done(error, null);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    console.log('Deserializing user with ID:', id);
    let user;
    
    // For mock database
    if (process.env.USE_MOCK_DB === 'true') {
      user = mockDb.getUserById(id);
    } else {
      // For MongoDB
      user = await User.findById(id);
    }
    
    console.log('Deserialized user:', user);
    done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error, null);
  }
});

module.exports = passport;