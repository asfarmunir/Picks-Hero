const WebSocket = require('ws');

// Initialize WebSocket server
const init = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket server');

    // When a message is received
    ws.on('message', (message) => {
      console.log('Received message:', message);
      ws.send('Server received your message');
    });

    // When the connection is closed
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log('WebSocket server running');
};

module.exports = { init };
