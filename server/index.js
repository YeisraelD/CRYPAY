/**
 * CRYPAY Backend - Main Entry Point
 * Separates server startup from application logic for better testability.
 */
const app = require('./app');

// Configure Environment Variables
const port = process.env.PORT || 3001;

/**
 * Start the Express server
 */
const server = app.listen(port, () => {
    console.log(`
🚀 CRYPAY API is running!
📡 Port: ${port}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🕒 Start Time: ${new Date().toISOString()}
    `);
});

// Implementation of graceful shutdown could be added here
module.exports = server;
