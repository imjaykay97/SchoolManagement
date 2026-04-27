const express = require('express');
const router = express.Router();

// Controller functions ko sahi naam se import karein
const { 
    addPayment, 
    getPayments, 
    getPaymentStats 
} = require('../controllers/paymentcontroller');

const { protect, adminOnly } = require('../middleware/authmiddleware');

// @route   GET /api/payments
router.get('/', protect, getPayments);

// @route   GET /api/payments/stats
router.get('/stats', protect, getPaymentStats);

// @route   POST /api/payments
router.post('/', protect, adminOnly, addPayment);

module.exports = router;