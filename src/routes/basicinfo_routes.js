
const express = require('express');
const router = express.Router();
const db = require('../config/db_connection'); // adjust path if needed

// POST API to save user data
router.post('/save-user', (req, res) => {

    const {
        firstname,
        lastname,
        email,
        mobile,
        country,
        gender,
        dob,
        role,
        company_name,
        industry,
        linkedin_url,
        skills,
        experience_level,
        total_experience,
        portfolio,
        achievements,
        bio,
        interests
    } = req.body;

    const sql = `
        INSERT INTO usermaster (
            firstname, lastname, email, mobile, country, gender, dob,
            role, company_name, industry, linkedin_url, skills,
            experience_level, total_experience, portfolio,
            achievements, bio, interests
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        firstname,
        lastname,
        email,
        mobile,
        country,
        gender,
        dob,
        role,
        company_name,
        industry,
        linkedin_url,
        skills,
        experience_level,
        total_experience,
        portfolio,  
        achievements,
        bio,
        interests
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
            message: "User saved successfully",
            user_id: result.insertId
        });
    });
});

module.exports = router;