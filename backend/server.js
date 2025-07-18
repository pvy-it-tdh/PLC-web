const nodes7 = require('nodes7');
const plc = new nodes7();
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const conn = new nodes7();
let plcData= {};

function connectToPLC() {
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
        plcData = values;
        console.log('PLC Data:', plcData);
      }
    });
  }
  );
} 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});