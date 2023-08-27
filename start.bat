@echo off

killall node

set "projectPath=C:\Users\WATS\Documents\ATTA-When-Air-Takes-Shape"
set "serverPath=%projectPath%\Server"
set "clientPath=%projectPath%\Client"

cd /d "%projectPath%"
git checkout staging-branch
git pull

cd /d "%serverPath%"
npm install 
npm install -g ts-node
ts-node server.ts &

cd /d "%clientPath%"
npm install
npm start &
