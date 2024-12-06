const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../model/db.model');

const SECRET_KEY = 'your_secret_key';

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role],
        (err) => {
            if (err) return res.status(500).json({ error: 'Registration failed' });
            res.status(201).json({ message: 'User registered successfully' });
        }
    );
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
};
