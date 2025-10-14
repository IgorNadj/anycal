FROM node:22-alpine

COPY . /home/node/app

WORKDIR /home/node/app

RUN yarn install
RUN yarn run build

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
