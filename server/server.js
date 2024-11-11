require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const OpenAI = require("openai");

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
app.use('/auth', authRoutes(db));

// Configure OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to call OpenAI API
const getAIResponse = async (prompt) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
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
        // Get AI response from OpenAI
        const aiResponse = await getAIResponse(userPrompt);

        // Store chat history in MySQL database
        const query = 'INSERT INTO chat_history (user_prompt, ai_response) VALUES (?, ?)';
        db.query(query, [userPrompt, aiResponse], (err, results) => {
            if (err) {
                console.error('Error saving chat history:', err);
                return res.status(500).json({ error: 'Error saving chat history' });
            }
            console.log('Chat history saved:', results);

            // Send AI response back to the client only after saving
            res.status(200).json({ aiResponse });
        });
    } catch (error) {
        console.error('Error in chat request:', error);
        res.status(500).json({ error: 'Error generating AI response' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
