const express = require('express');
const router = express.Router();
const db = require('../config/db_connection');// adjust path if needed

// GET all users from user_master
router.get('/usersprofile', (req, res) => {

    const sql = 'SELECT * FROM usermaster';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({
                status: false,
                message: 'Database error'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Users fetched successfully',
            data: result
        });
    });

});

module.exports = router;