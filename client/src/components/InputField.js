import React, { useState } from 'react';
import './style.css';

function InputField({ onSendMessage }) {
    const [message, setMessage] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFocused, setIsFocused] = useState(false); // Track input focus

    const suggestions = [
        'Write Js code for it',
        'Explain more',
        'Explain more',
        'Explain more',
        'Explain more'
    ];

    const handleSendClick = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
            setShowSuggestions(false); // Hide suggestions after sending message
        }
    };

    const handleClearSuggestions = () => {
        setShowSuggestions(false); // Clear suggestions when cross is clicked
    };

    return (
        <div>
            {showSuggestions && (
                <div className="suggestions-container">
                    <p className="suggestions-title">Chat Suggestions</p>
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} className="suggestion-item">
                                {suggestion}

                            </li>
                        ))}
                        <button className="clear-button" onClick={handleClearSuggestions}>
                            <i className="fas fa-times"></i>
                        </button>
                    </ul>
                </div>
            )}

            <div className="input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        setShowSuggestions(e.target.value.trim() !== ''); // Show suggestions when there's input
                    }}
                    onFocus={() => setIsFocused(true)} // Focus event
                    onBlur={() => setIsFocused(false)} // Blur event
                    placeholder="Write Coding about new HTML Tags"
                    className="message-input"
                />
                <button onClick={handleSendClick} className="send-button">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>

            {/* Hidden purple message box */}
            {isFocused && (
                <div className="hidden-message">
                    <p>All results were generated but AI, if you get anywrong answers <span className='report'>report here</span></p>
                </div>
            )}

            {/* Remove version text when purple box is visible */}
            {!isFocused && <p className='version'>Superpage AI Chat V1.2</p>}
        </div>
    );
}

export default InputField;
