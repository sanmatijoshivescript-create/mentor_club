
const SibApiV3Sdk = require('sib-api-v3-sdk');
const db = require('../config/db_connection');

// Brevo setup
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// ✅ SEND OTP
exports.sendOtp = (req, res) => {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 🔥 Delete old OTP
    db.query(
        "DELETE FROM otp_verification WHERE email=?",
        [email],
        (err) => {
            if (err) {
                console.log(err);
                return res.json({ success: false });
            }

            // ✅ Insert new OTP
            db.query(
                "INSERT INTO otp_verification (email, otp, expires_at) VALUES (?, ?, ?)",
                [email, otp, expiresAt],
                async (err) => {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false });
                    }

                    try {
                        // 📩 Send Email
                        await tranEmailApi.sendTransacEmail({
                            sender: {
                                email: process.env.EMAIL,
                                name: "MENTORApp"
                            },
                            to: [{ email: email }],
                            subject: "OTP Verification",
                            htmlContent: `<h3>Your OTP is: ${otp}</h3>`
                        });

                        console.log("OTP:", otp);

                        res.json({
                            success: true,
                            message: "OTP sent"
                        });

                    } catch (error) {
                        console.log("EMAIL ERROR:", error.response?.body || error);
                        res.json({ success: false });
                    }
                }
            );
        }
    );
};

// ✅ VERIFY OTP
exports.verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    db.query(
        `SELECT * FROM otp_verification 
         WHERE email=? 
         ORDER BY created_at DESC 
         LIMIT 1`,
        [email],
        (err, results) => {

            if (err) {
                console.log(err);
                return res.json({ success: false });
            }

            if (results.length === 0) {
                return res.json({
                    success: false,
                    message: "No OTP found"
                });
            }

            const record = results[0];

            // ❌ expired
            if (new Date() > new Date(record.expires_at)) {
                db.query(
                    "DELETE FROM otp_verification WHERE email=?",
                    [email]
                );

                return res.json({
                    success: false,
                    message: "OTP expired"
                });
            }

            // ❌ wrong OTP
            if (record.otp != otp) {
                return res.json({
                    success: false,
                    message: "Invalid OTP"
                });
            }

            // ✅ success → delete OTP
            // db.query(
            //     "DELETE FROM otp_verification WHERE email=?",
            //     [email]
            // );
            setInterval(() => {
    db.query(
        "DELETE FROM otp_verification WHERE expires_at < NOW()",
        (err) => {
            if (err) console.log(err);
            else console.log("Expired OTP deleted");
        }
    );
}, 5 * 60 * 1000);

            return res.json({
                success: true,
                message: "OTP verified"
            });
        }
    );
};