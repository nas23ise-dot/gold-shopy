const mongoose = require('mongoose');

// Use your actual MongoDB connection string here
const mongoUri = 'mongodb+srv://Gold-shop:goldshop@cluster0.ela5ylc.mongodb.net/goldshop?retryWrites=true&w=majority';

console.log('Attempting to connect to MongoDB...');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully!');
  mongoose.connection.close();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});