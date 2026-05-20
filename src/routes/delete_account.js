const express = require("express");
const router = express.Router();
const db = require("../config/db_connection"); // mysql2 pool

router.post("/deactivate-user", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. check user
    const [users] = await db.promise().query(
      "SELECT * FROM login WHERE email = ? AND password = ?",
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // 3. update activation = 0
    // await db.promise().query(
    //   "UPDATE login SET activation = 0 WHERE id = ?",
    //   [user.id]
    // );
await db.promise().query(
  "UPDATE login SET activation = 0 WHERE email = ?",
  [email]
);
    return res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;