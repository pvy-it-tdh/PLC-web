const nodes7 = require('nodes7');
const plc = new nodes7();
require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./src/config/db');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Khởi tạo kết nối PLC
plc.initiateConnection({
  port: process.env.PLC_PORT || 102,
  host: process.env.PLC_HOST || '192.168.0.1',
  rack: process.env.PLC_RACK || 0,
  slot: process.env.PLC_SLOT || 1
}, (err) => {
  if (err) {
    console.error('Error connecting to PLC:', err);
    return;
  }
  console.log('Connected to PLC');
  plc.addItems([
    { name: 'Input1', type: nodes7.ItemType.Bool, address: 'DB1.DBX0.0' },
    { name: 'Output1', type: nodes7.ItemType.Bool, address: 'DB1.DBX1.0' }
  ]);
  plc.readAllItems((err, values) => {
    if (err) {
      console.error('Error reading items:', err);
    } else {
      console.log('PLC Data:', values);
    }
  });
});

// Export plc instance cho controller dùng
module.exports.plcInstance = plc;

// Route cho auth
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

// Route cho PLC
const plcRoutes = require('./src/routes/plc');
app.use('/api/plc', plcRoutes);

app.get('/', (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      console.error('Database connection error:', err);
      return res.status(500).send('DB error');
    }
    console.log('Database connected successfully:', results);
    res.send('API is running');
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});