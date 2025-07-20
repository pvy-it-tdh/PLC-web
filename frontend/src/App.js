import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Home from './pages/Home';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loginMsg, setLoginMsg] = useState('');

  const handleLogin = (token, msg) => {
    setToken(token);
    setLoginMsg(msg);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return <Home onLogout={handleLogout} />;
}

export default App;
