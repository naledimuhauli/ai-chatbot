import React, { useState } from 'react';

function InputField({ onSendMessage }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="input-field">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
            />
            <button type="submit">Send</button>
        </form>
    );
}

export default InputField;
