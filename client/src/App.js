import React from 'react';
import Sidebar from './components/sidebar';
import ChatWindow from './components/chatWindow';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;
