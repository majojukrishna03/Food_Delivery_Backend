const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');


router.post('/', paymentController.createPayment);  // Create a payment
// router.get('/:id', paymentController.getPaymentById);  // Get a payment by ID
// router.delete('/:id', paymentController.deletePayment);  // Delete a payment

module.exports = router;
