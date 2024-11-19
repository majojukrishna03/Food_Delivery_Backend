const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ['user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});


userSchema.pre('save', async function (next) {
  // Hash the password if it is modified
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.error('Error hashing password:', error); // Debug log
      return next(error);
    }
  }

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
