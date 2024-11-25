const User = require('../models/userModel');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({
      name,
      email,
      password,
      phone,
      address,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ message: 'Error logging in user', error: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are run
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

exports.getAdminCount = async (req, res) => {
  try {
    // Correctly filter users by role, not by _id
    const adminCount = await User.countDocuments({ role: "admin" });
    // console.log(adminCount);
    res.status(200).json({ count: adminCount });
  } catch (err) {
    console.error('Error fetching admin count:', err);
    res.status(500).json({ message: 'Error fetching admin count', error: err.message });
  }
};
