import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Message from './Message';
import Sidebar from './sidebar';
import InputField from './InputField';
import SearchHistory from './searchHistory';

function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const { state } = useLocation();  // Retrieve state passed from registration
    const userName = state?.name || 'User';  // Directly use name from state

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
