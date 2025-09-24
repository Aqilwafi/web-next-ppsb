FROM node:20-alpine

WORKDIR /app

# Copy dulu package.json
COPY web/package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code
COPY web/ ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
