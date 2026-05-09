const express = require('express');
const router = express.Router();
const db = require('../config/db_connection'); // adjust path

// GET API - Fetch mentor cards
router.get('/mentors', (req, res) => {

    const sql = `
        SELECT 
            id,
            name,
            role,
            location,
            company_name,
            rating,
            photo
        FROM mentor_cards
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

module.exports = router;