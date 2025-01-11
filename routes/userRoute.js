
const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize')
const { register, verifyOTP, login, userInformation } = require('../controller/user');


router.post('/register', register);

router.post('/verify-otp', verifyOTP);

router.post('/login', login);

router.get('/getUserInfo', authorize.auth, userInformation);

module.exports = router;
