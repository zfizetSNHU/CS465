// server.js
require('dotenv').config();
const app = require('./app'); // <-- load your app.js
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Website running at http://localhost:${port}`);
});
