class Router {

    route(message, origin){
        console.log(message, origin)
    }

    start(address, port){
        const dgram = require('dgram')
        const server = dgram.createSocket('udp4')

        server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            server.close();
        });
        
        server.on('message', (msg, rinfo) => {
            this.route(msg, `${rinfo.address}:${rinfo.port}`)
        });
        
        server.on('listening', () => {
            const address = server.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
        
        server.bind(port, address);          
    }
}

module.exports = Router