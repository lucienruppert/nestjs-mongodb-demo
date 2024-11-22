# NestJS Products API Guide

This is a RESTful API built with NestJS and MongoDB Atlas for managing products.

## Live Demo
The application is deployed and accessible at:
https://nestjs-mongodb-demo-production.up.railway.app/

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Database

The application is connected to MongoDB Atlas, a cloud-hosted MongoDB service. The connection is already configured in the application.

### MongoDB Atlas Configuration
For the application to work in both development and production (Railway):
1. Go to MongoDB Atlas dashboard
2. Navigate to Network Access
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (adds 0.0.0.0/0)
5. Click "Confirm"

This configuration is necessary because Railway uses dynamic IP addresses.

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

The application runs on port 3000 locally.

Development mode with auto-reload:
```bash
npm run start:dev
```

Production mode:
```bash
npm run start:prod
```

Once started, the API will be available at:
- Local: `http://localhost:3000`
- Production: `https://nestjs-mongodb-demo-production.up.railway.app`

You can verify the server is running by accessing:
- Local: `http://localhost:3000/products`
- Production: `https://nestjs-mongodb-demo-production.up.railway.app/products`

Both should return a list of products (empty array if no products exist).

## API Endpoints

### Create Product
- **POST** `/products`
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
- **GET** `/products`
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
- **GET** `/products/:id`
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
- **PATCH** `/products/:id`
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
- **DELETE** `/products/:id`
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

Replace `BASE_URL` with either:
- Local: `http://localhost:3000`
- Production: `https://nestjs-mongodb-demo-production.up.railway.app`

### Create a Product
```bash
curl -X POST ${BASE_URL}/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "description": "This is a test product",
    "price": 19.99
  }'
```

### Get All Products
```bash
curl ${BASE_URL}/products
```

### Get Single Product
```bash
curl ${BASE_URL}/products/your-product-id
```

### Update Product
```bash
curl -X PATCH ${BASE_URL}/products/your-product-id \
  -H "Content-Type: application/json" \
  -d '{
    "price": 25.99
  }'
```

### Delete Product
```bash
curl -X DELETE ${BASE_URL}/products/your-product-id
```

## Error Handling

The API includes proper error handling:
- Returns 404 when a product is not found
- Validates required fields (title, description, price) when creating products
- Handles invalid MongoDB IDs gracefully

## Deployment Notes

When deploying to production environments (like Railway):

### MongoDB Atlas Access
1. Ensure MongoDB Atlas Network Access is configured to allow connections from anywhere (0.0.0.0/0)
2. This is required because Railway uses dynamic IP addresses

### Railway Configuration
- Use `npm install --omit=dev` to exclude development dependencies
- The application includes a postinstall script that automatically runs the build
- Node.js version 18 or higher is required (specified in package.json)
- The application will use the PORT environment variable if available, defaulting to 3000

### Troubleshooting MongoDB Connection
If you see the error: "Unable to connect to the database. Retrying..."
1. Go to MongoDB Atlas dashboard
2. Check Network Access settings
3. Ensure 0.0.0.0/0 is in the IP whitelist
4. Wait a few minutes for the changes to propagate

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
