FROM node:20.10.0-alpine

LABEL authors="Mário Gomes"

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD npm run migrate && npm run start