# Use an official Node.js runtime as a parent image
FROM node:18

# Create app directory
RUN mkdir -p /user_search/app
WORKDIR /user_search/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the command to start the server
CMD ["npm", "start"]
