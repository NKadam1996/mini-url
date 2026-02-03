FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose app port
EXPOSE 3000

# Dev command (hot reload)
CMD ["node", "src/server.js"]