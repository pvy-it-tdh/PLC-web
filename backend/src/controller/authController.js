
const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

// Đăng ký user mới - chỉ cho phép admin (đã kiểm tra qua middleware)
exports.register = async (req, res) => {
  try {
    const { username, password, role_id } = req.body;
    if (!username || !password || !role_id) {
      return res.status(400).json({ message: 'Username, password and role_id are required.' });
    }
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role_id });
    return res.status(201).json({ message: 'User created successfully', user: { id: user.id, username: user.username, role_id: user.role_id } });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
