# Product Management Backend

Node.js backend API for the product management application with MongoDB integration.

## Features

- RESTful API endpoints for product management
- MongoDB integration with Mongoose ODM
- TypeScript support
- CORS enabled for frontend integration
- Environment configuration

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `DELETE /api/products/:id` - Delete a product by ID

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in `.env` file

3. Run the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/product-management
NODE_ENV=development
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript files
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Schema

### Product
- `name`: String (required)
- `price`: Number (required, positive)
- `description`: String (optional)
- `createdAt`: Date
- `updatedAt`: Date
