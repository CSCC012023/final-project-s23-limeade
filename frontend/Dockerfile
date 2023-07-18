FROM node:lts-alpine
WORKDIR /usr/src/app

COPY ./frontend/package*.json ./

RUN npm install

# bundle app source
COPY . .

EXPOSE 4200
CMD ["npm", "start"]