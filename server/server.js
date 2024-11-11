require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const axios = require('axios');

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

// Set up Google AI API key
const apiKey = process.env.GOOGLE_API_KEY; // Store your API key in .env file

// Function to call Google AI API using your API key
const getAIResponse = async (prompt) => {
    try {
        const response = await axios.post(
            'https://language.googleapis.com/v1/documents:analyzeSentiment', // Example endpoint for Google Cloud Natural Language API
            {
                document: {
                    content: prompt,
                    type: 'PLAIN_TEXT',
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`, // Use your API key directly here
                },
            }
        );
        return response.data.documentSentiment; // Adjust depending on the response structure
    } catch (error) {
        console.error('Error calling Google AI API:', error);
        throw new Error('Failed to generate response');
    }
};

// Chat route to handle messages
app.post('/chat', async (req, res) => {
    const { userPrompt } = req.body;

    if (!userPrompt) {
        return res.status(400).json({ error: 'No prompt provided' });
    }

    try {
        // Get AI response from Google AI
        const aiResponse = await getAIResponse(userPrompt);

        // Store chat history in MySQL database
        const query = 'INSERT INTO chat_history (user_prompt, ai_response) VALUES (?, ?)';
        db.query(query, [userPrompt, aiResponse], (err, results) => {
            if (err) {
                console.error('Error saving chat history:', err);
                return res.status(500).json({ error: 'Error saving chat history' });
            }
            console.log('Chat history saved:', results);
        });

        // Send AI response back to the client
        res.status(200).json({ aiResponse });
    } catch (error) {
        console.error('Error in chat request:', error);
        res.status(500).json({ error: 'Error generating AI response' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
