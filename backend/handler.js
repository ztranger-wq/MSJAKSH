const serverless = require('serverless-http');
const app = require('./server');
const connectDB = require('./config/db');

// Establish database connection once, when the Lambda container starts
connectDB();

module.exports.api = serverless(app);
