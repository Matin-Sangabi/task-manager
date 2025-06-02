
FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000 

CMD ["yarn", "start"]