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
npm start &> client.log &