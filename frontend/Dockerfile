# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package files from frontend
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/index.html ./index.html
COPY frontend/vite.config.js ./vite.config.js
COPY frontend/tailwind.config.js ./tailwind.config.js
COPY frontend/postcss.config.js ./postcss.config.js

# Build
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy dist from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start serve
CMD ["serve", "-s", "dist", "-l", "3000"]

