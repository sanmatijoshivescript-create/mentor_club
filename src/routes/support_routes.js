const express = require("express");
const router = express.Router();
const db = require("../config/db_connection"); // your existing connection file

// ✅ Insert support message
router.post("/support", (req, res) => {
    //res.send("Support route working ✅");
  const { email, message } = req.body;

  // validation
  if (!email || !message) {
    return res.status(400).json({
      success: false,
      message: "Email and message are required",
    });
  }

  const sql = "INSERT INTO support (email, message) VALUES (?, ?)";

  db.query(sql, [email, message], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Support message submitted successfully",
      data: result,
    });
  });
});

module.exports = router;