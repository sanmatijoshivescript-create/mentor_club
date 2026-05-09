
const express = require('express');
const router = express.Router();
const db = require('../config/db_connection');

// GET API - Fetch session cards
router.get('/session-card', (req, res) => {

    const sql = `
        SELECT 
            id,
            name,
            role,
            session_date,
            session_time,
            duration_minutes,
            photo
        FROM session_card
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json({
            success: true,
            data: results
        });
    });
});

module.exports = router;  // ✅ THIS LINE FIXES YOUR ERROR