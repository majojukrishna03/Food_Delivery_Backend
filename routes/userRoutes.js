const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD Routes
router.post('/Register', userController.createUser); // Create a user
router.get('/', userController.getAllUsers); // Get all users
router.get('/:id', userController.getUserById); // Get user by ID
router.put('/:id', userController.updateUser); // Update user by ID
router.delete('/:id', userController.deleteUser); // Delete user by ID

module.exports = router;
