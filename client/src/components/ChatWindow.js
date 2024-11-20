import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Message from './Message';
import Sidebar from './sidebar';
import InputField from './InputField';
import SearchHistory from './searchHistory';
import { FaUser } from 'react-icons/fa';
import { marked } from 'marked';

function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const { state } = useLocation();  // Retrieve state passed from registration
    const userName = state?.name || 'User';  // Directly use name from state
    const [loading, setLoading] = useState(false);  // State for loading AI responses
    const [error, setError] = useState(null);  // State for API errors
    const [showSearchHistory, setShowSearchHistory] = useState(true);  // Toggle for search history visibility

    const handleSendMessage = async (message) => {
        // Display the user message
        setMessages((prevMessages) => [...prevMessages, { user: 'You', text: message }]);
        setShowSearchHistory(false);  // Hide search history on message send

        try {
            setLoading(true);
            setError(null);

            // Call the backend API to get AI response
            const response = await axios.post('http://localhost:5000/chat', { userPrompt: message });

            // Convert AI response from Markdown to HTML
            let aiResponseHTML = marked(response.data.aiResponse);

            // Remove markdown stars and unwanted syntax (bold/italic)
            aiResponseHTML = aiResponseHTML.replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove **bold**
                .replace(/\*([^\*]+)\*/g, '$1')   // Remove *italic*
                .replace(/__([^_]+)__/g, '$1')    // Remove __bold__
                .replace(/_([^_]+)_/g, '$1');     // Remove _italic_

            // Add the AI's response to the messages
            setMessages((prevMessages) => [
                ...prevMessages,
                { user: 'AI', text: aiResponseHTML }, // Use cleaned text
            ]);
        } catch (err) {
            // Handle any errors that occur during the API call
            console.error('Error fetching AI response:', err);
            setError('Failed to fetch AI response. Please try again.');
        } finally {
            // Reset loading status
            setLoading(false);
        }
    };

    return (
        <div className="chat-window-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main-chat">
                <div className="navbar">
                    <p className="name">{userName} <span><FaUser /></span></p>
                    <hr />
                </div>
                {showSearchHistory && <SearchHistory />}
                <div className="messages">
                    {messages.length > 0 && (
                        <div className="conversation-bubble">
                            {messages.map((msg, index) => (
                                <Message key={index} user={msg.user} text={msg.text} />
                            ))}
                        </div>
                    )}
                    {loading && <p className="loading-indicator">AI is typing...</p>}
                    {error && <p className="error-message">{error}</p>}
                </div>
                <InputField onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}

export default ChatWindow;
