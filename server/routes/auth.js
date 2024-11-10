const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const authRoutes = (db) => {
    const router = express.Router();

    // Register Route
    router.post('/register', async (req, res) => {
        const { name, email, password } = req.body;

        // Check if user exists
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert new user into the database
            const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ message: 'Error saving user' });
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });

    // Login Route
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        // Find user
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

            // Verify password
            const isMatch = await bcrypt.compare(password, results[0].password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

            // Generate JWT
            const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });

    return router;
};

module.exports = authRoutes;
