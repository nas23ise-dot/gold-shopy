# Gold Shop Backend Setup Guide

This guide explains how to set up and run the Gold Shop backend API.

## Overview

The Gold Shop backend is a Node.js/Express API that provides e-commerce functionality for the jewelry store website. It includes:

- User authentication (register, login, profile management)
- Product management
- Shopping cart functionality
- Wishlist functionality
- Order management

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

**Note**: MongoDB is optional. If not installed, the backend will automatically use an in-memory mock database.

## Installation

1. Navigate to the backend directory:
   ```bash
   cd consumer-website/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the backend root directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/goldshop
JWT_SECRET=goldshopsecretkey
```

If you don't have MongoDB installed, the backend will automatically use the mock database.

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`.

## Database Options

### Option 1: MongoDB (Recommended for Production)
1. Install MongoDB locally or use MongoDB Atlas
2. Update the `MONGODB_URI` in your `.env` file
3. The backend will automatically connect to MongoDB

### Option 2: Mock Database (Development/Testing)
If MongoDB is not available, the backend will automatically switch to an in-memory mock database that:
- Provides all the same functionality as MongoDB
- Seeds with sample data on startup
- Works without any database installation
- Resets data when the server restarts

## API Endpoints

All API endpoints are prefixed with `/api`:

- **Authentication**: `/api/users`
- **Products**: `/api/products`
- **Cart**: `/api/cart`
- **Wishlist**: `/api/wishlist`
- **Orders**: `/api/orders`

See [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) for detailed API documentation.

## Testing

Run the test script to verify all endpoints are working:
```bash
node testEndpoints.js
```

## Seeding Sample Data

To populate the database with sample products and users:
```bash
node seedData.js
```

## Folder Structure

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

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:
1. Users register or login to receive a token
2. The token is included in the `Authorization` header for protected routes:
   ```
   Authorization: Bearer <token>
   ```

## Error Handling

All API responses follow a consistent format:
- **Success**: Returns the requested data
- **Error**: Returns a JSON object with a `message` field describing the error

## Deployment

For production deployment:
1. Set `NODE_ENV=production` in your `.env` file
2. Configure a proper `MONGODB_URI` for your production database
3. Set a strong `JWT_SECRET`
4. Deploy the backend to your preferred hosting platform

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check your MongoDB URI in `.env`
- If MongoDB is not available, the backend will automatically use the mock database

### Port Conflicts
- Change the `PORT` variable in `.env` to use a different port

### Authentication Issues
- Verify `JWT_SECRET` is set in `.env`
- Ensure tokens are sent with requests in the Authorization header

## Development

### Adding New Features
1. Create a new model in `models/`
2. Create a controller in `controllers/`
3. Add routes in `routes/`
4. Register the routes in `server.js`

### Code Structure
- **Controllers**: Handle HTTP requests and responses
- **Models**: Define data structures and database interactions
- **Routes**: Define API endpoints and connect them to controllers
- **Utils**: Helper functions and middleware

## Support

For issues or questions, check the documentation or contact the development team.