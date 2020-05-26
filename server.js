var WebSocket = require('ws')

const sock = new WebSocket('wss://trade.ledgerx.com/api/ws');

setTimeout(() => {
  console.log('closing websocket');
  sock.close();
}, 20000);


const express = require('express');
const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    console.log('Message received: ', msg);
  });

  // Send LedgerX messages to connected clients
  sock.onmessage = (msg) => {
    console.log('received msg: ', msg);
    ws.send(JSON.stringify(msg));
  }
});

