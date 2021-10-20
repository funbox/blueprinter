FROM node:14.18.0-stretch-slim

LABEL org.label-schema.description="Image for launching npm package \"@funbox/blueprinter-frontend\""
LABEL org.label-schema.vcs-url="https://github.com/funbox/blueprinter-frontend"

ARG BLUEPRINTER_VERSION=latest
WORKDIR /app
RUN npm install -g --silent @funbox/blueprinter-frontend@${BLUEPRINTER_VERSION}

ENTRYPOINT ["blueprinter-frontend"]
