import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Message from './Message';
import Sidebar from './sidebar';
import InputField from './InputField';
import SearchHistory from './searchHistory';

function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Fetch user data from the server on component mount
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/register'); // Adjust endpoint if necessary
                setUserName(response.data.name || 'User'); // Use name from the database or fallback to 'User'
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserName('User');
            }
        };

        fetchUserData();
    }, []);

    const handleSendMessage = (message) => {
        setMessages([...messages, { user: 'You', text: message }]);
    };

    return (
        <div className="chat-window-container">
            {/* Sidebar */}
            <div className="sidebar">
                <Sidebar />
            </div>

            {/* Main Chat Area */}
            <div className="main-chat">
                <div className="navbar">
                    <p className="name">{userName}</p>
                    <hr />
                </div>
                <SearchHistory />
                <div className="messages">
                    {messages.map((msg, index) => (
                        <Message key={index} user={msg.user} text={msg.text} />
                    ))}
                </div>
                <InputField onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}

export default ChatWindow;
