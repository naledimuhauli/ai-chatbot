import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Message from './Message';
import Sidebar from './sidebar';
import InputField from './InputField';
import MessageIcon from '@mui/icons-material/Message'; // Import the message icon

function ChatWindow() {
    const [messages, setMessages] = useState([]);

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
                    <p className="name">Johnson Doe</p>
                    <hr />
                </div>
                <div className="blank">
                    <p className="answer">Get answers in seconds</p>
                    <span className="text">Create and complete tasks using boards</span>
                    <div className="serach-history">
                        <span>Search history</span><span>Clear Chat History</span>
                        <MessageIcon className="message-icon" /> {/* Add the message icon */}
                        <h3>No Questions added</h3>
                        <p>Type your questions below and get answers fast</p>
                    </div>
                </div>
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
