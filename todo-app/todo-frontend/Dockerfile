FROM node:16 AS base-stage

WORKDIR /usr/src/app

# running as user "node" breaks "npm run build"
COPY . .

RUN npm ci

# move (later) REACT_APP_BACKEND_URL to ../.env
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api


# new stage, everything before this is gone
# the test-stage is not used in the final stage
# hence it is not shown in the logs when running
# docker build

# also, estimated time for tests is only 2s
FROM base-stage AS test-stage

# RUN stops the image building process if the command fails

# CMD does not stop the image building process if the command fails
# and is run instead when the image is run
RUN CI=true npm test


FROM base-stage AS build-stage

RUN npm run build


# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine

# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
