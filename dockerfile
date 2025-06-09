# Stage 1: Build
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --only=production && npm cache clean --force
ENV NODE_ENV=production

# Stage 3: Build
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY . .
COPY ./prisma /usr/src/app
RUN npm install && npm cache clean --force
RUN npm run build

# Stage 4: Production
FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./
COPY ./.env ./
RUN npx prisma generate
EXPOSE ${APP_PORT}
CMD ["node", "dist/main"]