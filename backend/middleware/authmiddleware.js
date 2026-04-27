const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * 1. Protect Middleware
 */
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Token nikalna
            token = req.headers.authorization.split(' ')[1].trim(); 

            // Secret key: Jo login function mein use ki hai, wahi yahan honi chahiye
            const secret = process.env.JWT_SECRET || 'secret123';
            
            // Token verify karna
            const decoded = jwt.verify(token, secret);

            // User dhoondhna
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'User not found, not authorized' });
            }

            next(); 
        } catch (error) {
            console.error("Token Verification Error:", error.message); 
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        // Agar Authorization header hi nahi hai
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

/**
 * 2. AdminOnly Middleware
 */
const adminOnly = (req, res, next) => {
    // lowercase check karein taaki 'Admin' ya 'admin' ka issue na ho
    if (req.user && req.user.role.toLowerCase() === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied: Only Admins can perform this action' });
    }
};

module.exports = { protect, adminOnly };