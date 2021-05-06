FROM node:14-alpine

WORKDIR /usr/src/odering-app/backend

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --only=production

COPY . ./

RUN yarn build
CMD [ "node", "dist/" ]