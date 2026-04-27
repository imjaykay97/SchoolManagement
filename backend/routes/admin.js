const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Model ka path check kar lena

// 1. Admin Register (Bina Hash wala)
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Admin already exists' });

        const user = await User.create({
            name,
            email,
            password, // Plain text password
            role: 'admin'
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' })
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Admin Login (Bina Hash wala)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && user.password === password) {
            if (user.role !== 'admin') return res.status(403).json({ message: "Not an Admin" });

            res.json({
                _id: user._id,
                name: user.name,
                role: user.role,
                // Asli Token jo protect middleware ko chahiye
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' })
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;