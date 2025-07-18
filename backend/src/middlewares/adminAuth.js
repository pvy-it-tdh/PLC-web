const jwt = require('jsonwebtoken');

module.exports = function adminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
  // Kiểm tra role (role_id = 1 là admin hoặc role là 'admin')
  if (!(decoded.role === 'admin' || decoded.role_id === 1)) {
    return res.status(403).json({ message: 'Only admin can register new users.' });
  }
  req.user = decoded;
  next();
}
