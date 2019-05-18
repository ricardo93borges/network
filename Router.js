
const send = (server, message, host, port) => {    
    server.send(message, port, host)
}

const route = (server, message, origin) => {
    console.log(`> Receive message from ${origin}: `)
    
    const address = server.address();
    let object = JSON.parse(message.toString())
    let [destHost, destPort] = object.destination.split(':')
    
    if(destHost !== address.address){
        console.log(`> Sending message to ${address.address}:6000`)
        send(server, message, destHost, 6000)
    }else{
        console.log(`> Sending message to ${address.address}:${destPort}`)
        send(server, object.message, destHost, destPort)
    }
}

const start = (address, port) => {
    const dgram = require('dgram')
    server = dgram.createSocket('udp4')

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });
    
    server.on('message', (msg, rinfo) => {
        route(server, msg, `${rinfo.address}:${rinfo.port}`)
    });
    
    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });
    
    server.bind(port, address);
    return server
}

module.exports = start