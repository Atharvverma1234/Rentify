// server/controllers/authController.js
const User = require('../models/User');
const jwt  = require('jsonwebtoken');

// Helper — generates both access and refresh tokens
const generateTokens = (userId, role) => {
  const access = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  const refresh = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
  );
  return { access, refresh };
};

// POST /api/auth/register  (owner accounts only)
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email and password are required' });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: 'Email already registered' });

    const user = await User.create({
      name,
      email,
      passwordHash: password,   // pre-save hook hashes this
      role: 'owner',
      phone: phone || '',
    });

    const tokens = generateTokens(user._id, user.role);
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      ...tokens,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/login  (all roles)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const match = await user.matchPassword(password);
    if (!match)
      return res.status(401).json({ message: 'Invalid credentials' });

    const tokens = generateTokens(user._id, user.role);
    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      ...tokens,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};