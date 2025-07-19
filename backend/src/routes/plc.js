const express = require('express');
const router = express.Router();
const plcController = require('../controller/plcController');

router.get('/readbit', plcController.readBit);
router.post('/writebit', plcController.writeBit);

module.exports = router;
