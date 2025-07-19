import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';

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

  return (
    <div className="App">
      <header className="App-header">
        <h2>Đăng nhập thành công!</h2>
        <div>{loginMsg}</div>
        <button onClick={handleLogout}>Đăng xuất</button>
        {/* Bạn có thể render giao diện điều khiển PLC ở đây */}
      </header>
    </div>
  );
}

export default App;
