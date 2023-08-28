FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

USER node

# requires the typescript dependency
# must not be in dev dependencies for "npm ci" to work
RUN npm run tsc

CMD ["npm", "start"]
