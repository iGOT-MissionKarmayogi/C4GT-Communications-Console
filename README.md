# C4GT Communications Console

## User Search API

## RUNNING THE SERVER ⚙️

Get Started on the Local Machine: To run the server on your local machine, follow these steps:

### 1. Install Node.js

Ensure that Node.js is installed on your machine. If you haven’t installed it yet, you can follow the official [Node.js installation guide](https://nodejs.org/) to download and install it.

### 2. Ensure MongoDB is Installed

Ensure MongoDB is installed and running on your local machine. If you haven’t installed it yet, you can follow the official [MongoDB installation guide](https://docs.mongodb.com/manual/installation/) to download and install it.

### 3. Clone the GitHub Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/iGOT-MissionKarmayogi/C4GT-Communications-Console

```

### 4. Checkout the following branch

```bash
git checkout user-search-api

```

### 5. Install Dependencies

```bash
npm install

```

### 6. Configure Environment Variables

To run the server, you'll need to create a .env file in the root directory of your project. This file will store the necessary environment variables required for the server to run.

Here’s how to set it up:

1. Create a .env file in the root directory of your project if it doesn’t already exist.

2. Add the following environment variables to the .env file:

```bash
APPLICATION_PORT=3000
APPLICATION_ENV=development
MONGODB_URL=mongodb://localhost:27017/c4gt-data
SCHEMA_PATH=../schema/user_schema.json

```

### 7. Run the Server

```bash
npm start

```

This will launch the server on http://localhost:3000 (or the port specified in APPLICATION_PORT).

### 8. Access the API Documentation

You can access the API documentation by navigating to the /doc route on your server. Alternatively, you can paste the `swagger.yaml` file into a Swagger editor to view the documentation.
