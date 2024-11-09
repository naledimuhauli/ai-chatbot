import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from './Message';
import Sidebar from './sidebar';
import InputField from './InputField';

function ChatWindow() {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (message) => {
        setMessages([...messages, { user: 'You', text: message }]);
    };

    return (
        <div className="container">
            <div className='row'>
                <div className="col-2">
                    <div className="chat-window">
                        <Sidebar />
                    </div>
                    <div className="col-10">
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <Message key={index} user={msg.user} text={msg.text} />
                            ))}
                        </div>
                        <InputField onSendMessage={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;
