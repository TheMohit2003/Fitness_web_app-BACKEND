// Import required modules
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
// Set the port number to use, default to 5000
const port = process.env.PORT || 5000;

// Import custom error handler middleware
const { errorHandler } = require('./middlewares/errorMiddleware');

// Connect to the database
const connectDB = require('./config/db');

connectDB();

// Create an instance of the express app
const app = express();

// enable CORS for all routes
app.use(cors());

// Set up middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up routes for handling user requests
app.use('/', require('./routes/userRoutes'));

// Use the custom error handler middleware to handle errors
app.use(errorHandler);

// Start the server and listen for requests on the specified port
app.listen(port, () => console.log(`server running on port ${port}`));
