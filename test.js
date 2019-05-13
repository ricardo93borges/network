const dgram = require('dgram');
const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');
client.send(message, 6001, '192.168.0.103', (err) => {
  client.close();
});