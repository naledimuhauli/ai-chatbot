import React, { useState, useEffect } from 'react';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';  // <-- Added import
import './style.css';

function SearchHistory() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [isHistoryCleared, setIsHistoryCleared] = useState(false);

  // Fetch search history from the server when the component mounts
  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/search-history');
        if (!response.ok) {
          throw new Error('Failed to fetch search history');
        }
        const data = await response.json();
        setSearchHistory(data.searchHistory);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchSearchHistory();
  }, []);

  // Handle clearing the history
  const handleClearHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clear-history', {
        method: 'DELETE', // Make sure this is handled correctly on the server side
      });
      if (response.ok) {
        // Clear the local state after clearing history
        setSearchHistory([]);
        setIsHistoryCleared(true);
      } else {
        console.error('Failed to clear search history');
      }
    } catch (error) {
      console.error('Error clearing history: ', error);
    }
  };

  return (
    <div>
      <div className="blank">
        <p className="answer">Get answers in seconds</p>
        <span className="text">Create and complete tasks using boards</span>
        <div className="serach-history">
          <div className="d-flex justify-content-between align-items-center">
            <span className="his">Search history</span>
            {!isHistoryCleared && searchHistory.length > 0 && (
              <button className="clear-history" onClick={handleClearHistory}>
                Clear Chat History
              </button>
            )}
          </div>

          {isHistoryCleared || searchHistory.length === 0 ? (
            <>
              <MessageIcon className="message-icon" />
              <h3>No Questions added</h3>
              <p className='type'>Type your questions below and get answers fast</p>
            </>
          ) : (
            <div className="history-grid">
              {searchHistory.map((entry, index) => {
                const timeAgo = Math.round((new Date() - new Date(entry.timestamp)) / 60000); // Calculate time difference in minutes
                return (
                  <div key={index} className="history-entry">
                    <table className="history-table">
                      <tbody>
                        <tr>
                          <td className="icon-cell">
                            <PersonIcon className="user-icon" />
                          </td>
                          <td className="content-cell">
                            <div>
                              <p className="question">{entry.user_prompt}</p>
                              <span className="meta">
                                {entry.totalQuestions} questions asked
                                <span className="timestamp">
                                  • {timeAgo} mins ago
                                </span>
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>


                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchHistory;