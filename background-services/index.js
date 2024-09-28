const express = require('express');
const cron = require('./cron');
const websocket = require('./websocket');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware or API routes (optional)
app.get('/', (req, res) => {
  res.send('Background Service Running!');
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});

// Initialize CRON jobs
cron.init();

// Initialize WebSocket
websocket.init(server);
