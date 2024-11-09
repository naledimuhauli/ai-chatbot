import React from 'react'
import MessageIcon from '@mui/icons-material/Message';
import './style.css';

function searchHistory() {
  return (
    <div>
      <div className="blank">
        <p className="answer">Get answers in seconds</p>
        <span className="text">Create and complete tasks using boards</span>
        <div className="serach-history">
          <span>Search history</span>
          <MessageIcon className="message-icon" />
          <h3>No Questions added</h3>
          <p>Type your questions below and get answers fast</p>
        </div>
      </div>
    </div>
  )
}

export default searchHistory
