#!/bin/sh

IMAGE_NAME="funbox/blueprinter"
BLUEPRINTER_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

docker build --build-arg BLUEPRINTER_VERSION=$BLUEPRINTER_VERSION -t $IMAGE_NAME:$BLUEPRINTER_VERSION - < Dockerfile
docker push $IMAGE_NAME:$BLUEPRINTER_VERSION
docker tag $IMAGE_NAME:$BLUEPRINTER_VERSION $IMAGE_NAME:latest
docker push $IMAGE_NAME:latest
