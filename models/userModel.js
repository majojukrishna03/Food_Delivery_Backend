const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Regex to validate email format
        },
        message: 'Invalid email format',
      },
    },
    password: { type: String, required: [true, 'Password is required'] },
    phone: { type: String },
    address: { type: String },
    role: { 
      type: String, enum: ['user', 'admin'],
      default: 'user', 
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.error('Error hashing password:', error);
      return next(error);
    }
  }
  next();
});

// Method to validate password
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
