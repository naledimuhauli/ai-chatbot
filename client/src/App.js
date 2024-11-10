import React from 'react';
import ChatWindow from './components/chatWindow';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/register';


function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/dashboard" element={<ChatWindow />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
