# === Stage 1: Build ===
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the NestJS application
RUN npm run build

# === Stage 2: Run ===
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependencies from the build stage
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the built application from Stage 1
COPY --from=builder /usr/src/app/dist ./dist

# Copy any necessary .env file into the container (for configuration on runtime)
COPY .env ./

# Expose port (use ENV for flexibility)
EXPOSE ${APP_PORT}

# Start the application
CMD ["node", "dist/main"]