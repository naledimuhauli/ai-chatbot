import React, { useState } from 'react';
import Message from './Message';
import InputField from './InputField';

function ChatWindow() {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (message) => {
        setMessages([...messages, { user: 'You', text: message }]);
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} user={msg.user} text={msg.text} />
                ))}
            </div>
            <InputField onSendMessage={handleSendMessage} />
        </div>
    );
}

export default ChatWindow;
