FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

# actually omit-dev is now what --only=prod was for
RUN npm ci --only=production --omit=dev

ENV DEBUG=todo-backend:*

USER node

CMD npm start
