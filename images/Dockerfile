FROM node:16-alpine3.14

WORKDIR /app

COPY package.json package.json

RUN npm i

COPY src src

COPY tsconfig.json tsconfig.json

CMD npm start