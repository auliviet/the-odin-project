FROM node:26-alpine AS builder
WORKDIR /app
COPY src/package.json src/package-lock.json ./
RUN npm ci
COPY src .
RUN npm run build && npm prune --omit=dev

FROM node:26-alpine
WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000
RUN adduser -D app
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/dist ./
COPY --from=builder --chown=app:app /app/package.json /.
USER app
CMD ["node", "app.js"]
