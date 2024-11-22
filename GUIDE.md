# NestJS Products API Guide

This is a RESTful API built with NestJS and MongoDB Atlas for managing products.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Database

The application is connected to MongoDB Atlas, a cloud-hosted MongoDB service. The connection is already configured in the application, so no additional database setup is required locally.

## Installation

Development setup:
```bash
npm install
```

Production setup (excludes dev dependencies):
```bash
npm install --omit=dev
```

## Running the Application

The application runs on port 3000.

Development mode with auto-reload:
```bash
npm run start:dev
```

Production mode:
```bash
npm run start:prod
```

Once started, the API will be available at `http://localhost:3000`

You can verify the server is running by accessing:
- `http://localhost:3000/products` - Should return a list of products (empty array if no products exist)

## API Endpoints

### Create Product
- **POST** `http://localhost:3000/products`
- Creates a new product in MongoDB
- Request body:
```json
{
    "title": "Product Name",
    "description": "Product Description",
    "price": 29.99
}
```
- Response: Returns the MongoDB document ID of the created product
```json
{
    "id": "generated-product-id"
}
```

### Get All Products
- **GET** `http://localhost:3000/products`
- Returns an array of all products from MongoDB
- Response:
```json
[
    {
        "id": "product-id",
        "title": "Product Name",
        "description": "Product Description",
        "price": 29.99
    }
]
```

### Get Single Product
- **GET** `http://localhost:3000/products/:id`
- Returns a specific product by MongoDB document ID
- Response:
```json
{
    "id": "product-id",
    "title": "Product Name",
    "description": "Product Description",
    "price": 29.99
}
```

### Update Product
- **PATCH** `http://localhost:3000/products/:id`
- Updates an existing product in MongoDB
- Request body (all fields optional):
```json
{
    "title": "Updated Product Name",
    "description": "Updated Description",
    "price": 39.99
}
```

### Delete Product
- **DELETE** `http://localhost:3000/products/:id`
- Deletes a product from MongoDB by ID

## Data Storage

All data is stored in MongoDB Atlas with the following schema:
```typescript
{
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
}
```

## Example Usage with cURL

### Create a Product
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "description": "This is a test product",
    "price": 19.99
  }'
```

### Get All Products
```bash
curl http://localhost:3000/products
```

### Get Single Product
```bash
curl http://localhost:3000/products/your-product-id
```

### Update Product
```bash
curl -X PATCH http://localhost:3000/products/your-product-id \
  -H "Content-Type: application/json" \
  -d '{
    "price": 25.99
  }'
```

### Delete Product
```bash
curl -X DELETE http://localhost:3000/products/your-product-id
```

## Error Handling

The API includes proper error handling:
- Returns 404 when a product is not found
- Validates required fields (title, description, price) when creating products
- Handles invalid MongoDB IDs gracefully

## Deployment Notes

When deploying to production environments (like Railway):
- Use `npm install --omit=dev` to exclude development dependencies
- The application includes a postinstall script that automatically runs the build
- Node.js version 18 or higher is required (specified in package.json)
- Ensure environment variables are properly set for MongoDB connection
- The application will use the PORT environment variable if available, defaulting to 3000

## Package.json Configuration

Key configurations in package.json:
```json
{
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "postinstall": "npm run build"
  }
}
```
These ensure proper Node.js version compatibility and automatic build after installation in production environments.
