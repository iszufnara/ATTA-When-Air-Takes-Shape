# ATTA - When Air Takes Shape

Project information can be found here: 

## Overview

As the UI layer is written in React Native and is browser based, it does not have access to the hardware layer of the machine. In order to send a message from the UI to the microcontroller, a node.js server acts as the bridge between the two. 

The node.js server has a very simple set of tasks:
- Searches for the Arduino via Serial Port and connects to it
- Tries to Reconnect to the Arduino if a connection is Lost (ie. if a cable is unplugged)
- Listens for HTTP POST requests for commands
- Translates these commands to a command for the Arduino via Serial Port

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
Then Call this function to send the command (example):
```
 <button onClick={() => sendCommand("1")}>1</button>
``

The UI should map the Air Quality Index to a number between 0-9. (Note, perhaps this mapping should be moved to the server layer, and take in the AQI number instead)

## Directories

Arduino ->  Arduino Code that listens to commands via the serial port and drives the structure's stepper motors

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


