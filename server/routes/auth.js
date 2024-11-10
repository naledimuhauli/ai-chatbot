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

                // Retrieve the newly inserted user details
                const user = { id: result.insertId, name, email };

                // Generate JWT with user id
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                // Send response with token and user data
                res.status(201).json({
                    message: 'User registered successfully',
                    token,
                    user, // Send user data along with the token
                });
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

            // Create user object to send back
            const user = { id: results[0].id, name: results[0].name, email: results[0].email };

            // Generate JWT with user id
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Send response with token and user data
            res.json({
                message: 'Login successful',
                token,
                user, // Send user data along with the token
            });
        });
    });

    return router;
};

module.exports = authRoutes;
