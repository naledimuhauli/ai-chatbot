import React from 'react';
import './style.css';

function Message({ user, text }) {
    return (
        <div className={`message ${user === 'AI' ? 'ai' : 'user'}`}>
            <strong>{user}:</strong> {text}
        </div>
    );
}

export default Message;
