const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Dummy vehicle route data
const routeData = require('./locationData.json');

let currentIndex = 0;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint for vehicle location and route data
app.get('/api/location', (req, res) => {
  const currentLocation = routeData[currentIndex];
  const route = routeData.slice(0, currentIndex + 1);
  currentIndex = (currentIndex + 1) % routeData.length; // Loop through the data
  res.json({ currentLocation, route });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});