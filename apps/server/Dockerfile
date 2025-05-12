FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY ./data-source.ts ./


COPY ./src ./src


RUN npm install


RUN npm run build


CMD ["sh", "-c", "npm run migration:run && npm run start:prod"]
