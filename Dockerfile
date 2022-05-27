FROM node:14.18.0-stretch-slim

LABEL org.label-schema.description="Image for launching npm package \"@funboxteam/blueprinter\""
LABEL org.label-schema.vcs-url="https://github.com/funbox/blueprinter"

ARG BLUEPRINTER_VERSION=latest
WORKDIR /app
RUN npm install -g --silent @funboxteam/blueprinter@${BLUEPRINTER_VERSION}

ENTRYPOINT ["blueprinter"]
