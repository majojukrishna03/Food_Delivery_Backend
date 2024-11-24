const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { 
    type: Number, 
    required: true, 
    validate: {
      validator: (value) => value > 0,
      message: 'Amount must be a positive number.'
    }
  },
  paymentMethod: { type: String, default: 'Card' }, // Only Card as the payment method
  status: { type: String, enum: ['Completed', 'Failed'], default: 'Completed' }, // Defaults to 'Completed' on successful save
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
