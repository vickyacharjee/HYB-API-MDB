# Restful API with MongoDB and Express

## Overview

I have created a Restful API that supports all HTTP methods and performs CRUD operations in a MongoDB database. The API is built using Express.js and connected to MongoDB using Mongoose. Additionally, the API includes basic server-side rendering capabilities.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

### CRUD Operations

The API supports the following CRUD operations:

- **Create (POST):** Create new records in the database.
- **Read (GET):** Retrieve data from the database.
- **Update (PUT/PATCH):** Modify existing records in the database.
- **Delete (DELETE):** Remove records from the database.

### Database Connection

The API is connected to a MongoDB database using Mongoose, providing a robust and efficient way to interact with the data.

### Express.js Integration

Express.js is used as the web application framework to handle routing, middleware, and HTTP requests/responses.

### Server-Side Rendering

In addition to RESTful endpoints, the API supports basic server-side rendering. This feature enables the server to generate dynamic HTML content, enhancing the user experience.

## Usage

To run the API locally, follow these steps:

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Access the API at `http://localhost:8000`

## API Endpoints

### Create (POST)

- Endpoint: `/api/users`
- Description: Create a new record in the database.

### Read (GET)

- Endpoint: `/api/users`
- Description: Retrieve data from the database.

### Update (PUT/PATCH)

- Endpoint: `/api/users/:id`
- Description: Modify an existing record in the database.

### Delete (DELETE)

- Endpoint: `/api/users/:id`
- Description: Remove a record from the database.

## Server-Side Rendering

The API supports server-side rendering at the root URL (`/users`). This feature enhances the user interface by rendering dynamic content on the server before sending it to the client.

Feel free to explore and extend this API for your specific needs!
