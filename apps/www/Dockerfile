FROM node:20-alpine AS build

RUN apk add --no-cache git

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./
RUN corepack enable && pnpm install

COPY . .

RUN pnpm run build

EXPOSE 5000

CMD ["pnpm", "run", "start"]
