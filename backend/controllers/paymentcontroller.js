const Payment = require('../models/payment'); // 'const' small letter mein kar diya

// @desc    Nayi payment record karne ke liye
const addPayment = async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        const populatedPayment = await payment.populate('studentId', 'studentName rollNo');
        res.status(201).json(populatedPayment);
    } catch (error) {
        res.status(400).json({ message: "Payment record failed: " + error.message });
    }
};

// @desc    Saari payments fetch karne ke liye
const getPayments = async (req, res) => {
    try {
        const history = await Payment.find()
            .populate('studentId', 'studentName rollNo')
            .sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "History cannot be fetched: " + error.message });
    }
};

// @desc    Total stats
const getPaymentStats = async (req, res) => {
    try {
        const payments = await Payment.find();
        const totalCollected = payments
            .filter(p => p.status === 'Paid')
            .reduce((sum, p) => sum + p.amount, 0);
        const totalPending = payments
            .filter(p => p.status === 'Pending')
            .reduce((sum, p) => sum + p.amount, 0);

        res.json({
            totalCollected,
            totalPending,
            totalInvoices: payments.length
        });
    } catch (error) {
        res.status(500).json({ message: "Stats cannot be calculated: " + error.message });
    }
};

// Exporting with names that match your Routes
module.exports = { 
    addPayment, 
    getPayments, 
    getPaymentStats 
};