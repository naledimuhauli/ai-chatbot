require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Database connected successfully');
});

// Use the routes
app.use('/auth', authRoutes(db)); // Pass the DB connection to auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
