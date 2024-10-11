import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountantDashboard from './pages/AccountantDashboard';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';

function App() {
  return (
      <Router>
        <Routes>
          <Route path = "/" element = {<LandingPage/>} />
          <Route path = "/accDash" element = {<AccountantDashboard/>} />
          <Route path = "/auth" element = {<Auth/>} />
        </Routes>
      </Router>
    
  );
}

export default App;