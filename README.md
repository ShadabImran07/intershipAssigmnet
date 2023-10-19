# intershipAssigmnet

# E-Commerce Website Backend

The E-Commerce Website Backend is the server-side component of an e-commerce platform. It provides the functionality for both sellers and buyers, allowing sellers to manage their products and orders and buyers to browse products and place orders.

## Features

- **Authentication**: Register and log in users. Generate authentication tokens for secure access to the system.
- **Buyer Features**:
  - View a list of all sellers.
  - Access a seller's catalog of products.
  - Place orders for products from a selected seller.

- **Seller Features**:
  - Register products for sale.
  - View and manage orders received from buyers.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js
- MongoDB
- Git (for cloning the repository)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   npm install
   ```
2.Create a .env file :
  ```bash
  MONGODB_URI=mongodb://localhost:27017/your-database-name
  JWT_SECRET=your-secret-key
```
3.Run the backend:
```bash
  npm run server
```

### Exposer of Api endpoints

#### Authentication APIs

- POST /api/auth/register
- Register a user. Provide username, password, and type (buyer/seller) in the request body.

- POST /api/auth/login
- Log in with a registered user and receive an authentication token.

#### Buyer APIs

- GET /api/buyer/list-of-sellers
- Get a list of all sellers.

- GET /api/buyer/seller-catalog/:seller_id
- Get the catalog of a seller by seller_id.

- POST /api/buyer/create-order/:seller_id
- Create an order for a seller with id = seller_id. Send a list of items in the request body.

#### Seller APIs

- POST /api/seller/create-catalog
- Create a catalog for a seller. Send a list of items in the request body.

- GET /api/seller/orders
- Retrieve the list of orders received by a seller.



