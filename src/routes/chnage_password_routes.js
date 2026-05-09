
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db_connection');

// router.post('/change-password', (req, res) => {
//     const { email, password } = req.body;

//    // const sql = "UPDATE login SET password=? WHERE email=?";
//    const sql ='UPDATE login SET password="123456" WHERE email="san@gmail.com"';

//     db.query(sql, [password, email], (err, result) => {
//         if (err) return res.status(500).json({ success: false });

//         res.json({ success: true });
//     });
// });

// module.exports = router;   // ✅ MUST


const express = require('express');
const router = express.Router();   // ✅ REQUIRED
const db = require('../config/db_connection');

router.post('/change-password', (req, res) => {
    const { email, password } = req.body;

    const sql = "UPDATE login SET password=? WHERE email=?";

    db.query(sql, [password, email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false });
        }

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: "Email not found" });
        }

        res.json({ success: true });
    });
});

module.exports = router;   // ✅ MUST