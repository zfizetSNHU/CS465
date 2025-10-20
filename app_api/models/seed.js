// app_api/models/seed.js

const path = require('path');
const fs = require('fs');
const mongoose = require('./db');       // DB connection
const Trip = require('./travlr');       // Trip model

// Load seed data from JSON file
const tripsPath = path.join(__dirname, '../../data/trips.json');
let trips = [];

try {
  trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));
} catch (err) {
  console.error('Error reading trips.json:', err);
  process.exit(1);
}

// Seed function
const seedDB = async () => {
  try {
    console.log('Seeding database...');
    // Delete existing trips
    await Trip.deleteMany({});
    // Insert seed data
    await Trip.insertMany(trips);
    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Close DB connection
    await mongoose.connection.close();
    process.exit(0);
  }
};

// Run the seed
seedDB();
