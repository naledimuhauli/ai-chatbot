// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Ensure this path is correct

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test Database Connection
async function testDatabaseConnection() {
    try {
        await db.getConnection();
        console.log('Connected to database successfully!');
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
    }
}

// Call the function to test the connection
testDatabaseConnection();

// Routes
app.use('/api/auth', authRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, db };
