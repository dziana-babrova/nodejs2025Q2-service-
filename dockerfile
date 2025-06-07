# === Stage 1: Build ===
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --only=production
ENV NODE_ENV=production

# === Stage 2: Development ===
FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY . .
COPY ./doc /usr/src/app
RUN npm install
EXPOSE ${APP_PORT}
CMD ["npx", "nodemon", "--watch", "src", "./src/main.ts"]

# === Stage 3: Build ===
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY . .
COPY ./doc ./doc
RUN npm install
RUN npm run build

# === Stage 4: Production ===
FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY ./.env ./
COPY ./doc ./
EXPOSE ${APP_PORT}
CMD ["node", "dist/main"]