#!/bin/bash

TASKILL //F //IM node.exe

projectPath="/Users/WATS/Documents/ATTA-When-Air-Takes-Shape"
serverPath="$projectPath/Server"
clientPath="$projectPath/Client"

cd "$projectPath" || exit 1
git checkout staging-branch
git pull

cd "$serverPath" || exit 1
npm install
npm install -g ts-node
ts-node server.ts &

cd "$clientPath" || exit 1
npm install
npm start &