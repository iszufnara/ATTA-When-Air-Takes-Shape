#!/bin/bash

TASKKILL //F //IM node.exe

git checkout staging-branch
git pull

cd "Server" || exit 1
npm install
npm install -g ts-node
ts-node server.ts &> server.log &

cd "../Client" || exit 1
npm install 
npm run build
npm install -g serve
serve -s build
start msedge --kiosk --edge-kiosk-type="fullscreen" "localhost:3000"