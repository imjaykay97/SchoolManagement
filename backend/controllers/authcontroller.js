const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret123'; 

// REGISTER USER
const registerUser = async (req, res) => {
    const { name, studentName, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email: email.toLowerCase().trim() });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // User create karte waqt name ya studentName dono handle kar rahe hain
        const user = await User.create({ 
            name: name || studentName, 
            studentName: studentName || name,
            email: email.toLowerCase().trim(), 
            password, 
            role: role || 'student' 
        });
        
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Find user by email
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        
        // 2. Use the matchPassword method from User Model
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                // Frontend ke liye 'userName' bhej rahe hain (Student Portal ki requirement)
                userName: user.studentName || user.name || "User",
                email: user.email,
                role: user.role, // 'admin' ya 'student'
                token: jwt.sign(
                    { id: user._id, role: user.role }, 
                    JWT_SECRET, 
                    { expiresIn: '30d' }
                )
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };