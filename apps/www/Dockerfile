FROM node:20-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 5000

CMD ["pnpm", "run", "start"]
