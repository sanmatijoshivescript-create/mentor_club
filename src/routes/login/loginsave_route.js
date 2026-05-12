// const express = require('express');
// const router = express.Router();

// const bcrypt = require('bcrypt');
// const db = require('../../config/db_connection');

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: 'Email and password are required'
//         });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const sql = 'INSERT INTO login (email, password) VALUES (?, ?)';

//         db.query(sql, [email, hashedPassword], (err, result) => {
//             if (err) {
//                 console.error('DB Error:', err);
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Insert failed'
//                 });
//             }

//             res.json({
//                 success: true,
//                 message: 'User created',
//                 insertId: result.insertId
//             });
//         });

//     } catch (error) {
//         console.error('Hash Error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Hashing error'
//         });
//     }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();

const db = require('../../config/db_connection');

router.post('/loginsave', (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    const sql = 'INSERT INTO login (email, password) VALUES (?, ?)';

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({
                success: false,
                message: 'Insert failed'
            });
        }

        res.json({
            success: true,
            message: 'User saved (plain text)',
            insertId: result.insertId
        });
    });
});

module.exports = router;