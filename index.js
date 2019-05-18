
/**
 * TODO get IP [v]
 * TODO listen to command line [v]
 * TODO read file [v]
 * TODO send file
 * 
 * class Router
 *  receive, send messages
 * 
 * class Client
 *  receive, send, log messages
 * 
 * index files
 *  instantiate Routers and clients accordingly to params
 */

/* const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const prompt = require('prompt');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234, '192.168.0.103');

prompt.start()

listenCommandLine = () => {
    prompt.get(['destination', 'filepath'], function (err, result) {
        sendMessage(result.destination, result.filepath)
    })
}

sendMessage = (destination, filepath) => {
    let message = {origin:'from', destination:'to', message:'msg'}
    server.send(JSON.stringify(message), 41234, '192.168.0.103')
    setTimeout( listenCommandLine, 1000)
}

setTimeout( listenCommandLine, 1000) */

const os = require('os');
const ifaces = os.networkInterfaces();

getHost = () => {
    let host = null
    Object.keys(ifaces).forEach( (interface) => {
        addresses = ifaces[interface]
        addresses.forEach( (address) => {
            if(address.internal === false && address.family === 'IPv4')
                host = address.address
        })
    })
    return host    
}

getParams = () => {
    let type = null;
    let port = null;
    for(let i = 0; i < process.argv.length; i++){
        if(process.argv[i] === '--type'){
            type = process.argv[i+1]
        }else if(process.argv[i] === '--port'){
            port = process.argv[i+1]
        }
    }
    return [type, port]
}

let host = getHost()
let [type, port] = getParams()

if(type === null || port === null){
    console.log('Informe o tipo (--type) e a porta (--port)')
}else{
    if(type === 'router'){
        const start = require('./Router')
        start(host, port)
    }else if(type === 'client'){
        const {start, listenCommandLine} = require('./Client')
        let server = start(host, port)
        setTimeout( listenCommandLine.bind(null, server), 1000)
    }
}