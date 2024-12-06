const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

exports.authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.userId = user.userId;
        req.role = user.role;
        next();
    });
};

exports.adminOnly = (req, res, next) => {
    if (req.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    next();
};
