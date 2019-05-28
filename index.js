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