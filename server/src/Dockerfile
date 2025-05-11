# Use official Node.js image as the base image
FROM node:18-alpine
LABEL author="ngnphmgiahuy <yuh.nguyenpham@gmail.com>"

# Set the working directory in the container
WORKDIR /app

# Install MongoDB tools
RUN apk add --no-cache mongodb-tools

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodeapp -u 1001 -G nodejs

# Copy the rest of the application
COPY . .

# Set the proper permissions
RUN chown -R nodeapp:nodejs /app

# Switch to non-root user
USER nodeapp

# Set environment variables
ENV NODE_ENV=production
ENV DATABASE_CONNECT_LINK=mongodb://mongodb:27017/recial
ENV GENERATE_DATA=false

# Expose the port Node.js is running on
EXPOSE 8080

# Start the Node.js application with data generation option
CMD ["sh", "-c", "if [ \"$GENERATE_DATA\" = \"true\" ]; then node -e \"require('./utils/dataGenerator')().then(() => console.log('Data generation complete'))\"; fi && node index.js"]
