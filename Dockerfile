FROM node:22-alpine

WORKDIR /app
# Copy dulu package.json
COPY web/package*.json ./

# Install dependencies
RUN npm install

RUN npm install pg 
#RUN npm install bcrypt
# Copy semua source code
COPY web/ ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
