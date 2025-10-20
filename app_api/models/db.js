const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}:27017/travlr`; // Docker exposes 27017

mongoose.connect(dbURI);

const db = mongoose.connection;

db.on('connected', () => console.log(`Mongoose connected to ${dbURI}`));
db.on('error', (err) => console.error('Mongoose connection error:', err));
db.on('disconnected', () => console.log('Mongoose disconnected'));

// Graceful shutdown
const gracefulShutdown = (msg) => {
    db.close(() => console.log(`Mongoose disconnected through ${msg}`));
};

process.once('SIGUSR2', () => { gracefulShutdown('nodemon restart'); process.kill(process.pid, 'SIGUSR2'); });
process.on('SIGINT', () => { gracefulShutdown('app termination'); process.exit(0); });
process.on('SIGTERM', () => { gracefulShutdown('app shutdown'); process.exit(0); });

// Import schema
require('./travlr');

module.exports = mongoose;
