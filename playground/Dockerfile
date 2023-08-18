FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

# only=production so devDependencies are not installed
# ci deletes node_modules before installing, follows package-lock.json, doesn't alter files
# ci is for reliable builds, install is for installing new dependencies
RUN npm ci --only=production

ENV DEBUG=playground:*

USER node

CMD npm start
