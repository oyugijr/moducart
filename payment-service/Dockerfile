FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN pnpm install --production

COPY . .

EXPOSE 4005

CMD ["node", "src/server.js"]
