import React from 'react';

function Message({ user, text }) {
    return (
        <div className={`message ${user === 'AI' ? 'ai' : 'user'}`}>
            <strong>{user}:</strong>
            <span dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    );
}

export default Message;
