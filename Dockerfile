# ========== FRONTEND BUILD STAGE ==========
FROM node:18 AS frontend-build
WORKDIR /app/frontend

# Install and build frontend
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

# ========== BACKEND STAGE ==========
FROM node:18
WORKDIR /app

# Install backend dependencies
COPY server/package*.json ./
RUN npm install

# Copy backend source
COPY server .

# Copy frontend build into backend public folder
COPY --from=frontend-build /app/frontend/dist ./public

# Build backend (if you use TS build)
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]