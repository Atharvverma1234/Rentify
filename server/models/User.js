// server/models/User.js
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role:         { type: String, enum: ['owner', 'tenant'], required: true },
  phone:        { type: String, default: '' },
  pushToken:    { type: String, default: '' },
}, { timestamps: true });

// Auto-hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});

// Compare password helper
userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);