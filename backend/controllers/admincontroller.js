const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// 1. Admin Register (Plain Password)
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Bina hashing ke seedha create kar rahe hain
        const user = await User.create({
            name,
            email,
            password, // Seedha plain text password save hoga
            role: 'admin'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', {
                    expiresIn: '30d',
                }),
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Admin Login (Plain Password Check)
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Seedha (===) se password match kar rahe hain
        if (user && user.password === password) {
            if (user.role !== 'admin') {
                return res.status(403).json({ message: "Admin role required" });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', {
                    expiresIn: '30d',
                }),
                role: user.role
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginAdmin, registerAdmin };