
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('module-alias/register');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const otpRoutes = require('./src/routes/sendOtpRoutes');

app.use('/api', otpRoutes);

const basicinfoRoutes = require('./src/routes/basicinfo_routes');
app.use('/api/basic', basicinfoRoutes);

const sessionRoutes = require('./src/routes/sessionset_routes');

app.use('/api/session', sessionRoutes);
const mentorRoutes = require('./src/routes/mentorcard_routes');

app.use('/api', mentorRoutes);
const sessionCardRoutes = require('./src/routes/sessioncard_routes');

app.use('/api', sessionCardRoutes);


const userProfileRoutes = require('./src/routes/userprofile_routes');
// Use routes
app.use('/api', userProfileRoutes);



const loginRoutes = require('./src/routes/login/login_route');

app.use('/api', loginRoutes);



const changePasswordRoutes = require('./src/routes/chnage_password_routes');

app.use('/api', changePasswordRoutes);


const loginsaveRoute = require('./src/routes/login/loginsave_route'); // adjust path

// use route
app.use('/api', loginsaveRoute);

// import route
const saveTokenRoute = require("./src/routes/save_token");

// use route
app.use("/api", saveTokenRoute);

//module.exports = router;

// Test API
app.get('/', (req, res) => {
    res.send('API Running 🚀');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} 🚀`);
});