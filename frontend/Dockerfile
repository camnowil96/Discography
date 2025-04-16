# Build stage
FROM node:23-alpine3.20 AS build_image
WORKDIR /app/react-app

# Set the Vite env variable for backend URL
ENV VITE_BACKEND_URL=http://54.152.188.133:30200

# Copy package files and install all dependencies (including dev dependencies)
COPY package*.json ./
RUN npm install

# Copy remaining files and build
COPY . .
RUN npm run build

# Production stage
FROM node:23-alpine3.20 AS production_image
WORKDIR /app/react-app

# Set environment to development to ensure dev dependencies are installed
ENV NODE_ENV=development

# Copy package files first
COPY package*.json ./

# Install dependencies including dev dependencies explicitly
RUN npm install --include=dev

# Copy the build output and config files needed for preview
COPY --from=build_image /app/react-app/dist ./dist
COPY vite.config.ts ./

# Expose the Vite preview port
EXPOSE 4173

# Start the app using Vite's preview mode
CMD ["npm", "run", "preview"]