# ATTA - When Air Takes Shape

Directories

Arduino ->  Arduino Code

Server -> Node.js server that handles the serial connection to Arduino and listens for input from React Native Client

Client -> React Native client


## Setting Up Server

In the Server directory, run:
```
npm install
```

## Running Server
```
ts-node server.ts
```

## Interacting with the server Example

Do a HTTP Post call to the following endpoint:
http://localhost:3001/command?command=1


In React Native, use the following 
```
function sendCommand(command: string) {
  fetch('http://localhost:3001/command?command='+command, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',

  },
})
  .then(res => res.json());
```
