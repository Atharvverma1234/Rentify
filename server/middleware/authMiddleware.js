// server/middleware/authMiddleware.js
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT and attach user to req
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token)
    return res.status(401).json({ message: 'Not authorised — no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-passwordHash');
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// Only allow owner role through
exports.ownerOnly = (req, res, next) => {
  if (req.user?.role !== 'owner')
    return res.status(403).json({ message: 'Owner access only' });
  next();
};