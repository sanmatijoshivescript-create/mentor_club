// app.post("/save-token", async (req, res) => {
//   const { userId, fcmToken } = req.body;

//   try {
//     // save in database
//     await db.query(
//       "UPDATE users SET fcm_token = ? WHERE id = ?",
//       [fcmToken, userId]
//     );

//     res.json({ success: true, message: "Token saved" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false });
//   }
// });

// const express = require("express");
// const router = express.Router();

// console.log("save_token route loaded");

// router.post("/save-token", (req, res) => {
//   const { userId, fcmToken } = req.body;

//   console.log("Received token:", userId, fcmToken);

//   res.json({
//     success: true,
//     message: "Token saved successfully"
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require('../config/db_connection');// ⚠️ make sure your DB file path is correct

console.log("save_token route loaded");

router.post("/save-token", async (req, res) => {
  const { userId, fcmToken } = req.body;

  console.log("Received token:", userId, fcmToken);

  if (!userId || !fcmToken) {
    return res.status(400).json({
      success: false,
      message: "userId and fcmToken are required"
    });
  }

  try {
    const [result] = await db.query(
      "UPDATE usermaster SET fcm_token = ? WHERE id = ?",
      [fcmToken, userId]
    );

    console.log("DB result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "Token saved successfully"
    });

  } catch (err) {
    console.error("DB Error:", err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;