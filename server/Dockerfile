FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY shared/ ./shared/
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
WORKDIR /app/server
RUN npm ci

WORKDIR /app/client
RUN npm ci

# Copy sources
WORKDIR /app
COPY server/ ./server/
COPY client/ ./client/

# Build client and server
WORKDIR /app/server
RUN npm run build

WORKDIR /app/client
RUN npm run build

# Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/server/package*.json ./server/
COPY --from=builder /app/shared ./shared

WORKDIR /app/server
RUN npm ci --only=production

COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/prisma ./prisma
COPY --from=builder /app/client/dist /app/client/dist

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["node", "dist/index.js"]
