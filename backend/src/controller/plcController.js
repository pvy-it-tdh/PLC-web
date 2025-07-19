const plc = require('../../server').plcInstance;

// Đọc bit M0.0
exports.readBit = (req, res) => {
  plc.readItems(['M0.0'], (err, values) => {
    if (err) {
      return res.status(500).json({ message: 'Read error', error: err.message });
    }
    res.json({ bit: values['M0.0'] });
  });
};

// Ghi bit M0.0
exports.writeBit = (req, res) => {
  const { value } = req.body;
  if (typeof value !== 'boolean') {
    return res.status(400).json({ message: 'Value must be boolean (true/false)' });
  }
  plc.writeItems('M0.0', value, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Write error', error: err.message });
    }
    res.json({ message: 'Write successful', bit: value });
  });
};
