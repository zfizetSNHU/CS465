const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files in the travlr folder
app.use(express.static(__dirname));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Website running at http://localhost:${port}`);
});
