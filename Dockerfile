FROM node:22-alpine

WORKDIR /app

# Copy package.json dan package-lock.json
COPY web/package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code
COPY web/ ./

# Expose port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "dev"]
