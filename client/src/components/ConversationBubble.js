import React from 'react';
import Message from './Message';
import './style.css';

function ConversationBubble({ userMessage, aiMessage }) {
    return (
        <div className="message-container">
            <Message user="User" text={userMessage} />
            <Message user="AI" text={aiMessage} />
        </div>
    );
}

export default ConversationBubble;
