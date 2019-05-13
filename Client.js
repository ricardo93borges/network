const prompt = require('prompt');

class Client {

    receive(message, origin) {
        console.log("\n")
        console.log(message, origin)
        console.log("\n")
        setTimeout( this.listenCommandLine, 1000)
    }

    send(message, destination) {
        console.log(message, destination)
    }

    listenCommandLine() {
        prompt.get(['destination', 'filepath'], function (err, result) {
            sendMessage(result.destination, result.filepath)
        })
    }

    start(address, port) {
        const dgram = require('dgram')
        const server = dgram.createSocket('udp4')        

        server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            server.close();
        });
        
        server.on('message', (msg, rinfo) => {
            this.receive(msg, `${rinfo.address}:${rinfo.port}`)
        });
        
        server.on('listening', () => {
            const address = server.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
        
        server.bind(port, address);
        prompt.start()
        setTimeout( this.listenCommandLine, 1000)
    }
}

module.exports = Client