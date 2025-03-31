FROM node:23-alpine3.20

#working directory within the image - creates app folder if it doesn't exist
WORKDIR /app/

#copies dependencies from build context (local directory) into working directory
COPY package*.json ./

#installs dependencies
RUN npm install

#copies remaining files from build context (local directory) into working directory
COPY . .

# Build the React app
RUN npm run build 

# Expose the port Vite uses
EXPOSE 4173 

# Start the app using Vite's preview mode
CMD ["npm", "run", "preview"]
