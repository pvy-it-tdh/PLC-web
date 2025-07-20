import React from 'react';
import './Home.css';
import PLCControl from '../components/PLCControl/PLCControl';

function Home({ onLogout }) {
  // Lấy token từ localStorage nếu cần truyền cho PLCControl
  const token = localStorage.getItem('token');
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Hệ thống điều khiển PLC</h1>
        <p>Chào mừng bạn đến với trang chủ!</p>
        <button className="logout-btn" onClick={onLogout}>Đăng xuất</button>
      </header>
      <main>
        <PLCControl token={token} />
      </main>
    </div>
  );
}

export default Home;
