FROM node:alpine as base

WORKDIR /app

COPY package.json package-lock.json ./

RUN rm -rf node_modules

RUN npm update

COPY . .

CMD ["node", "./app.js"]

EXPOSE 3000