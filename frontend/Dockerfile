# Build stage
FROM node:23-alpine3.20 AS build_image
WORKDIR /app/react-app

# Set the Vite env variable for backend URL
ENV VITE_BACKEND_URL=https://discography.cameronnwilson.com/api

# Copy package files and install all dependencies (including dev dependencies)
COPY package*.json ./
RUN npm install

# Copy remaining files and build
COPY . .
RUN npm run build

# Production stage
FROM node:23-alpine3.20 AS production_image
WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy the built files from the previous stage
COPY --from=build_image /app/react-app/dist .

# Expose the port serve will listen on
EXPOSE 4173

# Start the static file server
CMD ["serve", "-s", ".", "-l", "4173"]
