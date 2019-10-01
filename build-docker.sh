#!/bin/bash

IMAGE_NAME="funbox/blueprinter"
BLUEPRINTER_VERSION=`npm view @funbox/blueprinter-frontend dist-tags.latest`

docker build --build-arg BLUEPRINTER_VERSION=$BLUEPRINTER_VERSION -t $IMAGE_NAME:$BLUEPRINTER_VERSION - < Dockerfile
docker push $IMAGE_NAME:$BLUEPRINTER_VERSION
docker tag $IMAGE_NAME:$BLUEPRINTER_VERSION $IMAGE_NAME:latest
docker push $IMAGE_NAME:latest
