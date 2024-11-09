import React, { useState } from 'react';
import './style.css';

function InputField({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleSendClick = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div>
            <div className="input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write Coding about new HTML Tags"
                    className="message-input"
                />
                <button onClick={handleSendClick} className="send-button">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
            <p className='version'>Superpage AI Chat V1.2</p>
        </div>
    );
}

export default InputField;
