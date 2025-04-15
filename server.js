// server.js
const express = require('express');
const path = require('path');
const app = express();

// Use the port defined by Heroku, or fall back to 3000 locally.
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory.
app.use(express.static(path.join(__dirname, 'public')));

// For Single Page Applications (if needed), forward unhandled routes to index.html.
// If your Quartz site is purely static with no client-side routing, you can remove this.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
