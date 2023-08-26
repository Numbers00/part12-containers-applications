FROM node:16

WORKDIR /usr/src/app

# running as user "node" breaks "npm run build"
COPY . .

RUN npm ci

RUN npm run build

RUN npm i -g serve

# exec form https://docs.docker.com/engine/reference/builder/#cmd
# RUN ["executable", "param1", "param2"]
# recommended form for using CMD
CMD ["serve", "build"]
