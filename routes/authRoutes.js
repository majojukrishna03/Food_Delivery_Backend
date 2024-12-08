const express = require('express');
const { loginUser, logoutUser, verifyToken } = require('../controllers/authController');
const router = express.Router();

// Login route
router.post('/login', loginUser);
router.post('/admin/login',loginUser);

// Logout route
router.post('/logout', logoutUser);

// Example protected route
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.name}` });
});

module.exports = router;
