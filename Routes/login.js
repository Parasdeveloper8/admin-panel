const express = require('express');
const router = express.Router();
const { pool } = require("../configuration/databasecon");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY;

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user from the database
        const [users] = await pool.query('SELECT * FROM Admin.registration WHERE Email = ?', [email]);

        if (users.length === 0) {
            return res.status(404).json({ error: 'No user found.' });
        }

        const user = users[0];

        // Check if the password field exists
        if (!user.Password) {
            return res.status(400).json({ error: 'Password not found in user record.' });
        }

        // Compare password
        const passwordIsValid = await bcrypt.compare(password, user.Password);

        if (!passwordIsValid) {
            return res.status(401).json({ auth: false, token: null, error: 'Invalid password.' });
        }

        // Generate token
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 }); // 24 hours

        // Store username and token in the session
        req.session.username = user.Name;
        req.session.emails = user.Email;
        req.session.token = token;

        return res.redirect('/home'); // Consider using JSON response if you plan to handle it on the frontend
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Error on the server.' });
    }
});

module.exports = router;
