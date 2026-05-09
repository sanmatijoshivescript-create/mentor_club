const express = require('express');
const router = express.Router();
//const db = require('../config/db_connection');
const db = require('../../config/db_connection');

// LOGIN API
exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM login WHERE Email=? AND Password=?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (result.length > 0) {
            res.json({
                success: true,
                message: "Login successful ✅",
                user: result[0]
            });
        } else {
            res.json({
                success: false,
                message: "Invalid credentials ❌"
            });
        }
    });
};
module.exports = router;