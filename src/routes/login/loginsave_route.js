
const express = require('express');
const router = express.Router();
const db = require('../../config/db_connection');

/** GET helps verify the URL on Render */
router.get('/loginsave', (req, res) => {
    res.status(200).json({
        ok: true,
        hint: 'Use POST with JSON body: { "email", "password" }'
    });
});

router.post('/loginsave', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    const sql = 'INSERT INTO login (email, password) VALUES (?, ?)';

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('loginsave DB Error:', err.code, err.message);

            const dup =
                err.code === 'ER_DUP_ENTRY' ||
                String(err.message || '').includes('Duplicate');

            return res.status(dup ? 409 : 500).json({
                success: false,
                message: dup ? 'Email already registered' : 'Insert failed'
            });
        }

        res.json({
            success: true,
            message: 'User saved (plain text password)',
            insertId: result.insertId
        });
    });
});

module.exports = router;