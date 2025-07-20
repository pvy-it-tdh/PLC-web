import React, { useState } from 'react';
import './PLCControl.css';

function PLCControl({ token }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const readBit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/plc/readbit');
      const data = await res.json();
      setStatus(data.bit);
    } catch (err) {
      setError('Không thể đọc trạng thái đèn');
    }
    setLoading(false);
  };

  const writeBit = async (value) => {
    setLoading(true);
    setError('');
    try {
      await fetch('http://localhost:4000/api/plc/writebit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ value })
      });
      setStatus(value);
    } catch (err) {
      setError('Không thể điều khiển đèn');
    }
    setLoading(false);
  };

  return (
    <div className="plc-control-container">
      <h3>Điều khiển Đèn (Bit M0.0)</h3>
      <div className="status-row">
        <span>Trạng thái hiện tại: </span>
        <span className={status ? 'on' : 'off'}>
          {status === null ? 'Chưa đọc' : status ? 'BẬT' : 'TẮT'}
        </span>
        <button onClick={readBit} disabled={loading} style={{marginLeft: 12}}>Đọc trạng thái</button>
      </div>
      <div className="btn-row">
        <button onClick={() => writeBit(true)} disabled={loading}>Bật đèn</button>
        <button onClick={() => writeBit(false)} disabled={loading}>Tắt đèn</button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default PLCControl;
