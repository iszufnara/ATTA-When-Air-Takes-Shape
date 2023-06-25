const {SerialPort} = require("serialport");
const {ReadlineParser} = require("@serialport/parser-readline");


// Define a class to manage the device through serial port
export default class Device {
    deviceName: string;
    baudrate: number;
    listeners = new Map();
    serialPort: typeof SerialPort;
    found = false;

    constructor(deviceName: string, baudrate: number) {
        this.deviceName = deviceName;
        this.baudrate = baudrate;

        this.findDevice();
    }

    on(type: string, _cb: (message: any) => void) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, _cb);
        }
    }

    emit(command: string) {
        console.log("Trying to send command: ", command);
        if (!this.found) 
        {
            console.log("serial port not found");
            this.findDevice();
            return;
        }
        this.serialPort.write(command, (err: { message: any; }) => {
            if (err) {
                console.log("Error on write: ", err.message);
            }
            console.log("sent: ", command);
        });
    }


    dispatchEvent(event: { type: any; data: any; }) {
        if (!this.listeners.has(event.type)) {
            return;
        }

        if (event.data) {
            try {
                const message = JSON.parse(event.data);
                const cb = this.listeners.get(event.type);
                cb(message);
            }
            catch (e) {
                console.error(e);
            }
        }
        else {
            const cb = this.listeners.get(event.type);
            cb();
        }


    }

    findDevice() {

        SerialPort.list().then((ports: any[]) => {
            ports.forEach((port) => {
                if (port.vendorId && port.vendorId.includes(this.deviceName)) {
                    console.log(port.path);
                    this.serialPort = new SerialPort({path: port.path,  baudRate: this.baudrate });
                    this.serialPort.on("open", () => {
                        console.log("serial port open");
                        this.dispatchEvent({ type: "connected", data: null });

                        this.found = true;
                    });

                    this.serialPort.on("close", () => {
                        console.log("serial port closed");
                        this.dispatchEvent({ type: "disconnected", data: null });
                        this.found = false;
                    });

                    const parser = this.serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

                    parser.on("data", (data: any) => {
                        console.log(data);
                        this.dispatchEvent({ type: "message", data });
                    });
                }
            });
        });

        if (!this.found) {
            console.log("Searching for device");
            setTimeout(() => {
                if (!this.found){
                this.findDevice();
                }
            }, 1000);
        }
    }
}
