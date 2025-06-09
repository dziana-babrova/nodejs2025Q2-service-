# Stage 1: Build
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json prisma ./
RUN npm install --only=production && npx prisma generate && npm cache clean --force
RUN npm prune --production

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm cache clean --force && npm run build

# Stage 3: Production
FROM node:18-alpine AS production
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY ./.env ./
EXPOSE ${APP_PORT}
CMD ["node", "dist/main"]
