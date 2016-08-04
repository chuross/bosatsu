FROM node:6.3.1

MAINTAINER chuross

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY index.js /usr/src/app

RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
