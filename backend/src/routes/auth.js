const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const adminAuth = require('../middlewares/adminAuth');

router.post('/register', adminAuth, authController.register);
router.post('/login', authController.login);

module.exports = router;
