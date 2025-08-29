# Product Management App
# Frontend
A modern web application built with Next.js, React, TypeScript, and Tailwind CSS for managing product catalogs.
- **Product Listing**: View all products with name, price, and description
- **Add Products**: Form to add new products with client-side validation
- **Delete Products**: Remove products with confirmation
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Full type safety throughout the application

# Backend
Node.js backend API for the product management application with MongoDB integration.
- RESTful API endpoints for product management
- MongoDB integration with Mongoose ODM
- TypeScript support
- CORS enabled for frontend integration
- Environment configuration

## Environment Variables

Create a `.env` file with the following variables:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/product-management
NODE_ENV=development
```

## Database Schema

### Product
- `name`: String (required)
- `price`: Number (required, positive)
- `description`: String (optional)
- `users`: Object (required)
- `createdAt`: Date
- `updatedAt`: Date

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `DELETE /api/products/:id` - Delete a product by ID

### Prerequisites

- Node.js 24+ 
- npm or yarn

### Installation
# Frontend
1. Navigate to the project directory:
```bash
cd product-management-app
cd frontend
npm install
cd npm run dev
```

## Backend (make sure mongod db connected and port set to (http://localhost:3001/))
1. Navigate to the project directory:
```bash
cd product-management-app
cd backend
npm install
cd npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser


## Project Structure
```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main page component
├── components/
│   ├── AddProductForm.tsx  # Form to add new products
│   └── ProductList.tsx     # Product listing component
├── services/
│   ├── api.ts          # Real API service (for production)
│   └── mockApi.ts      # Mock API service (for development)
└── types/
    └── product.ts      # TypeScript interfaces
```
## API Endpoints

The application uses the following mock API endpoints:

- `GET /products` - Fetch all products
- `POST /products` - Create a new product
- `DELETE /products/:id` - Delete a product by ID

## Features in Detail

### Product Listing
- Displays all products in a clean, responsive grid
- Shows product name, price, and description
- Includes delete functionality with confirmation

### Add Product Form
- **Name**: Required field (non-empty string)
- **Price**: Required field (positive number)
- **Description**: Optional field
- **Users**: Required field (Object)
- Client-side validation with error messages
- Success/error feedback after submission

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Grid layout that adapts to different screen sizes
- Clean, modern UI with proper spacing and typography

## Technologies Used
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Node.js** - Icons


## Backend (make sure mongod db connected and port set to (http://localhost:3001/))

## License

This project is open source and available under the MIT License.
