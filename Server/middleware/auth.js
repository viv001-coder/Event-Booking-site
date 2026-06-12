const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
//User ko authenticate karne ke liye token check karna, aur agar token valid hai to user info attach karna req object me
const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            next();      // middleware ka kam khatam
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware to check admin role
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
     res.status(403).json({ message: 'Forbidden, not authorized as an admin' });
    }
};

module.exports = { protect, admin };