FROM node:18.15.0-bullseye-slim

ARG BLUEPRINTER_VERSION=latest
ARG BUILD_DATE

LABEL org.opencontainers.image.title="Blueprinter" \
      org.opencontainers.image.description="An image to launch \"@funboxteam/blueprinter\" npm package" \
      org.opencontainers.image.vendor="FunBox" \
      org.opencontainers.image.licenses="Apache-2.0" \
      org.opencontainers.image.source="https://github.com/funbox/blueprinter" \
      org.opencontainers.image.version=$BLUEPRINTER_VERSION \
      org.opencontainers.artifact.created=$BUILD_DATE

WORKDIR /app
RUN npm install -g --silent @funboxteam/blueprinter@${BLUEPRINTER_VERSION}

ENTRYPOINT ["blueprinter"]
