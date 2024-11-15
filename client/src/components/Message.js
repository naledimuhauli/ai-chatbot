import React from 'react';

function Message({ user, text }) {
    return (
        <div className={`message ${user === 'AI' ? 'ai' : 'user'}`}>
            <strong>{user}:</strong>
            <span dangerouslySetInnerHTML={{ __html: text }} /> {/* Render HTML content safely */}
        </div>
    );
}

export default Message;
