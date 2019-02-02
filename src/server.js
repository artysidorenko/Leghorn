// *****************************************************************************
// server.js - This file is the main starting point for the Node server.
//
// ******************************************************************************

// Import dependencies

const http = require('http');
const router = require('./router');

// Declare server variables

const server = http.createServer(router);
const port = process.env.PORT || 3000;

// Initialize server

const startServer = () => {
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Server successfully started, listening on port 3000');
  });
};

startServer();
