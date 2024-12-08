const Payment = require('../models/paymentModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel'); 

// Create a payment
exports.createPayment = async (req, res) => {
  try {
    const { orderId, userId, amount, paymentMethod } = req.body;

    // Validate userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: 'Invalid userId: User does not exist',
      });
    }

    // Validate orderId
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({
        message: 'Invalid orderId: Order does not exist',
      });
    }

    // Create a new payment instance
    const newPayment = new Payment({
      orderId,
      userId,
      amount,
      paymentMethod : 'Card',
    });

    // Save the payment with the default status
    const savedPayment = await newPayment.save();

    // Respond with a success message
    res.status(201).json({
      message: 'Payment created successfully',
      payment: savedPayment,
    });
  } catch (err) {
    console.error('Error creating payment:', err);

    // If there was an error during the payment process
    const { orderId, userId, amount, paymentMethod } = req.body;

    try {
      // Log the failed payment record
      const failedPayment = new Payment({
        orderId,
        userId,
        amount,
        paymentMethod,
        status: 'Failed',
      });
      await failedPayment.save();
    } catch (logError) {
      console.error('Error logging failed payment:', logError);
    }

    // Respond with an error message
    res.status(500).json({
      message: 'Error creating payment',
      error: err.message,
    });
  }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('orderId', 'items totalPrice')
      .populate('userId', 'name email');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (err) {
    console.error('Error fetching payment:', err);
    res.status(500).json({
      message: 'Error fetching payment',
      error: err.message,
    });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error('Error deleting payment:', err);
    res.status(500).json({
      message: 'Error deleting payment',
      error: err.message,
    });
  }
};
