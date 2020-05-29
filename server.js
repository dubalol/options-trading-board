const WebSocket = require('ws')
const fetch = require('node-fetch');
const express = require('express');
const moment = require('moment');
const path = require('path');

const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.static('dist'))

app.get('/', (req, res) => res.send(path.resolve(__dirname, '/dist/index.html'))) 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/contracts', (req, res) => {
  const ts = moment().subtract(1, "days").toISOString();
  return fetch(`https://trade.ledgerx.com/api/contracts?after_ts=${ts}&limit=0`)
    .then(response => response.json())
    .then(json => res.send(json))
  }
)

app.get('/api/book-tops', (req, res) => {
  return fetch('https://trade.ledgerx.com/api/book-tops')
    .then(response => response.json())
    .then(json => res.send(json))
  }
)

const sock = new WebSocket('wss://trade.ledgerx.com/api/ws');

sock.onmessage = (msg) => {
  console.log('received msg: ', msg);
}

setTimeout(() => {
  console.log('closing websocket');
  sock.close();
}, 600000);

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

