// const express = require('express');
// const router = express.Router();
// const { sendOtp } = require('./sendOtp');

// router.post('/send-otp', sendOtp);

// module.exports = router;


const express = require('express');
const router = express.Router();

// const { sendOtp, verifyOtp } = require('./sendOtp');

// router.post('/send-otp', sendOtp);
// router.post('/verify-otp', verifyOtp);


const { sendOtp, verifyOtp } = require('./sendOtp');

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
module.exports = router;