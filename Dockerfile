# FROM node:20

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 8103

# CMD ["npm", "start"]


FROM node:20-alpine AS runner

WORKDIR /app

# Install dependencies only
COPY package*.json ./
RUN npm install --only=production

# Copy the app
COPY . .

EXPOSE 8103

CMD ["npm", "start"]


