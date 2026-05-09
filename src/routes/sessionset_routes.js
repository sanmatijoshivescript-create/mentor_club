const express = require('express');
const router = express.Router();
const db = require('../config/db_connection'); // adjust path if needed

// POST API to create session
router.post('/create-session', (req, res) => {

    const {
        session_title,
        description,
        duration,
        price,
        session_time
    } = req.body;

    // ✅ Basic validation
    if (!session_title || !price) {
        return res.status(400).json({
            success: false,
            message: "Session title and price are required"
        });
    }

    const sql = `
        INSERT INTO sessionset (
            session_title,
            description,
            duration,
            price,
            session_time
        ) VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        session_title,
        description,
        duration,
        price,
        session_time
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json({
            success: true,
            message: "Session created successfully",
            session_id: result.insertId
        });
    });
});

module.exports = router;