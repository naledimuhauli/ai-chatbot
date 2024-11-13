import React from 'react';
import './style.css';

function Message({ user, text }) {
    return (
        <div className="container">
            <div className="msg">
                <div className={`message ${user === 'AI' ? 'ai' : 'user'}`}>
                    <strong>{user}:</strong> {text}
                </div>
            </div>
        </div>
    );
}

export default Message;
