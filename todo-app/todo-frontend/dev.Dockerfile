FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

# moved REACT_APP_BACKEND_URL to ../.env

CMD ["npm", "start"]
