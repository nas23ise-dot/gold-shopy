# Gold Shop Backend API

This is the backend API for the Gold Shop e-commerce website built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, Google OAuth, profile management)
- Product management (CRUD operations)
- Shopping cart functionality
- Wishlist functionality
- Order management
- Search and filtering capabilities

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing

## Prerequisites

1. Node.js (v14 or higher)
2. MongoDB (local installation or MongoDB Atlas account)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/goldshop
JWT_SECRET=your_jwt_secret_key
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/goldshop?retryWrites=true&w=majority
```

For Google OAuth (optional):
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 4. Google OAuth Setup (Optional)

To enable Google OAuth authentication:

1. Follow the instructions in [GOOGLE_OAUTH_SETUP.md](../GOOGLE_OAUTH_SETUP.md)
2. Add your Google OAuth credentials to the `.env` file

### 5. Seed the Database

To populate the database with sample data:

```bash
node seedData.js
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/auth/google` - Google OAuth authentication
- `GET /api/users/auth/google/callback` - Google OAuth callback

### Products
- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/search` - Search products
- `GET /api/products/:categoryName/:itemName` - Get products by category
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/update` - Update cart item quantity (protected)
- `DELETE /api/cart/remove` - Remove item from cart (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

### Wishlist
- `GET /api/wishlist` - Get user wishlist (protected)
- `POST /api/wishlist/add` - Add item to wishlist (protected)
- `DELETE /api/wishlist/remove` - Remove item from wishlist (protected)
- `POST /api/wishlist/move-to-cart` - Move item from wishlist to cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

## Frontend Integration

The frontend uses the API through utility functions in `src/lib/api.ts`. The integration supports both authenticated and unauthenticated modes:

1. When a user is logged in, data is synchronized with the backend
2. When a user is not logged in, data is stored in localStorage
3. Upon login, localStorage data can be migrated to the user's account

## Data Models

### User
- name (String)
- email (String, unique)
- password (String, hashed)
- phone (String, optional)
- address (Object, optional)
- isAdmin (Boolean, default: false)

### Product
- name (String)
- price (Number)
- originalPrice (Number, optional)
- image (String)
- category (String)
- material (String)
- rating (Number, 0-5)
- reviews (Number)
- discount (Number, 0-100)
- isNew (Boolean)
- isBestseller (Boolean)
- tags (Array of Strings)
- description (String)
- stock (Number)

### Cart
- userId (Reference to User)
- items (Array of CartItems)
  - productId (Reference to Product)
  - quantity (Number)

### Wishlist
- userId (Reference to User)
- productIds (Array of References to Products)

### Order
- userId (Reference to User)
- items (Array of OrderItems)
  - productId (Reference to Product)
  - quantity (Number)
  - price (Number)
- totalAmount (Number)
- shippingAddress (Object)
- status (String: pending, processing, shipped, delivered, cancelled)
- paymentMethod (String)
- paymentStatus (String: pending, completed, failed, refunded)

## Development

### Project Structure
```
backend/
├── controllers/     # Request handlers
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
├── seedData.js      # Sample data seeder
├── server.js        # Entry point
└── .env             # Environment variables
```

### Adding New Features

1. Create a new model in `models/`
2. Create a controller in `controllers/`
3. Add routes in `routes/`
4. Register the routes in `server.js`

## Troubleshooting

### MongoDB Connection Issues

1. Ensure MongoDB is running:
   ```bash
   # For local MongoDB
   mongod
   ```

2. Check your MongoDB URI in `.env`

3. For MongoDB Atlas, ensure your IP is whitelisted in the Atlas dashboard

### Authentication Issues

1. Verify JWT_SECRET is set in `.env`
2. Check that tokens are being sent with requests in the Authorization header
3. Ensure passwords are being hashed correctly

### Google OAuth Issues

1. Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set correctly in `.env`
2. Check that the redirect URIs in Google Cloud Console match `http://localhost:5000/api/users/auth/google/callback`
3. Ensure the Google+ API is enabled in the Google Cloud Console
4. If using "External" user type, make sure your email is added to "Test users"

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT