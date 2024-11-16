const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

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

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You're an AI assistant. Answer questions in detail but keep responses concise unless specified.",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// Helper function to generate AI response
async function getAIResponse(userPrompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [{ text: userPrompt }],
                },
            ],
        });

        const result = await chatSession.sendMessage(userPrompt);
        return result.response.text();
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw new Error("Failed to generate AI response");
    }
}

// Route to fetch search history from MySQL
app.get('/api/search-history', (req, res) => {
    const query = 'SELECT * FROM chat_history ORDER BY timestamp DESC'; // Adjust query if needed

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching search history:', err);
            return res.status(500).json({ error: 'Error fetching search history' });
        }
        res.status(200).json({ searchHistory: results });
    });
});

// Route to clear search history from MySQL
app.delete('/api/clear-history', (req, res) => {
    const query = 'DELETE FROM chat_history'; // Delete all records from chat_history table

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error clearing search history:', err);
            return res.status(500).json({ error: 'Error clearing search history' });
        }
        console.log('Search history cleared:', results);
        res.status(200).json({ message: 'Search history cleared successfully' });
    });
});

// Chat route to handle messages
app.post('/chat', async (req, res) => {
    const { userPrompt } = req.body;

    if (!userPrompt) {
        return res.status(400).json({ error: 'No prompt provided' });
    }

    try {
        // Get AI response
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
