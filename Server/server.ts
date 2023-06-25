import Device from "./device";
const express = require("express");
const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`WATS listening at http://localhost:${port}`);
}
);


const serialPath = "1a86";
const baudRate = 19200;

const device = new Device(serialPath, baudRate);

device.on("data", (message) => {
    console.log("data", message);
}
);

device.on("error", (message) => {
    console.log("error", message);
}
);

device.on("connected", () => {
    console.log("connected");
}
);

device.on("disconnected", () => {
    console.log("disconnected");
}
);

app.use((req:any, res: any, next:any) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
  });

app.post("/command", (req: any, res: any) => {
    const command = req.query.command;
    console.log("command", command);
    device.emit(command);
    res.end();
});

app.post("/aqi", (req: any, res: any) => {
    const aqi = parseInt(req.query.value);
    console.log("aqi", aqi);

    if (aqi < 51) {
        device.emit("0");
    } else if (aqi < 101) {
        device.emit("1");
    } else if (aqi < 151) {
        device.emit("2");
    } else if (aqi < 201) {
        device.emit("3");
    } else if (aqi < 301) {
        device.emit("4");
    } else {
        device.emit("5");
    }
    res.end();
});

export {};