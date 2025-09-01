# Backend API for Smart Shopping Cart

## Project Overview
This is the **backend application** for the Smart Shopping Cart project. It provides RESTful APIs for **authentication, products, cart, orders, and favourites**. The backend is built with **Node.js, Express, and MongoDB** and integrates seamlessly with the Vue.js frontend.


## 🚀 Getting Started

Follow these steps to set up and run the backend application locally:

For Reference you can follow this documentation: [Click Here](https://vinyldavyl.medium.com/how-to-create-a-database-in-mongodb-atlas-and-connect-your-database-to-your-application-step-by-9b63a2886b83)

### 1. Create a MongoDB Atlas Account
- Sign up at [MongoDB Atlas Login]([https://www.mongodb.com/cloud/atlas](https://account.mongodb.com/account/login)).  

### 2. Create a Cluster
- Follow the Atlas UI to create a free cluster.  

### 3. Create a Database
- Create a new database and note the database name.  

### 4. Setup MongoDB Connection
- Obtain your MongoDB connection string from Atlas.  
- Create `.env` file on the root of the application:  

```env

APP_ID=shoppingcart
PORT=9000
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET=mySecret

JWT_SECRET=bezkoder-secret-key

#DATABASE
MONGODB_URI={UPDATE YOUR MONGODB URI HERE}

debug=true

APP_HOST=https://localhost:3000

```


## Install Dependencies

```bash

npm install
```


## Run the Application

```bash

npm run dev
```
- The backend server will start on [http://localhost:9000](http://localhost:9000/)


## 📄 API Documentation

After starting the server, access the Swagger API docs at:
http://localhost:9000/api-docs/#/

Here you can explore all endpoints, request/response schemas, and test the APIs directly.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **Documentation**: Swagger


## Author

Muhammad Moiz Siddique
Final Project - Smart Shopping Cart Backend
