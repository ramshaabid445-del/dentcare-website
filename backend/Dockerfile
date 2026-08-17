# Build stage
FROM node:18-alpine

WORKDIR /app

# Copy package files from backend
COPY backend/package*.json ./

# Install dependencies
RUN npm ci

# Copy backend source
COPY backend . 

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]

