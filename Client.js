const prompts = require('prompts');
const {read, write} = require('./Reader')

const receive = (server, message, origin) => {
    console.log("\n")
    console.log(`> Receive message from ${origin}: `)
    console.log(message.toString())
    console.log("\n")
    write(message.toString())
    setTimeout( listenCommandLine.bind(null, server), 1000)
}
    
const send = (server, message, destination) => {
    const address = server.address();
    let [destHost, destPort] = destination.split(':')

    if(destHost !== address.address){
        console.log(`> Sending message to ${address.address}:6000`)
        server.send(message, 6000, address.address)
    }else{
        console.log(`> Sending message to ${address.address}:${destPort}`)
        server.send(message, destPort, address.address)
    }

    setTimeout( listenCommandLine.bind(null, server), 1000)
}

const buildMessage = (filepath, destination) => {
    let message = read(filepath)
    return JSON.stringify({destination, message})
}

const listenCommandLine = async (server) => {
    let response = await prompts([
        {type: 'text', name: 'destination', message: 'Destination:'},
        {type: 'text', name: 'filepath', message: 'Filepath:'}
    ])
    let message = buildMessage(response.filepath, response.destination)
    //let message = buildMessage('file.txt', '192.168.0.103:6001')
    send(server, message, response.destination)
}

const start = (address, port) => {
    const dgram = require('dgram')
    server = dgram.createSocket('udp4')

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });
    
    server.on('message', (msg, rinfo) => {
        receive(server, msg, `${rinfo.address}:${rinfo.port}`)
    });
    
    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });
    
    server.bind(port, address);
    return server
}

module.exports = {start, listenCommandLine}