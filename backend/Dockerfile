FROM node:lts-alpine
WORKDIR /usr/src/app

COPY ./backend/package*.json ./

RUN npm install

# bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ] 