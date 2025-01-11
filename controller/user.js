// controllers/authController.js
const User = require('../modals/userModal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Registration Controller
exports.register = async (req, res) => {
    const { isDoctor, specialization, fullName, email, pinCode, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        // Create new user with OTP
        user = new User({
            isDoctor,
            specialization: isDoctor ? specialization : undefined,
            fullName: isDoctor ? fullName : undefined,
            email,
            pinCode: isDoctor ? pinCode : undefined,
            password: hashedPassword,
            otp,
            otpExpires,
        });

        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Healthcare App Registration',
            text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP email:', error);
                return res.status(500).json({ message: 'Failed to send OTP' });
            } else {
                console.log('OTP email sent:', info.response);
                return res.status(200).json({ message: 'OTP sent to email' });
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// OTP Verification Controller
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or OTP' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // OTP is valid; remove OTP fields and activate the user
        user.otp = undefined;
        user.otpExpires = undefined;
        // Optionally, you can add an 'isVerified' field
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });

    } catch (error) {
        console.error('OTP Verification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        // Check if OTP is verified
        if (user.otp) {
            return res.status(400).json({ message: 'Please verify your email OTP before logging in' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT payload
        const payload = {user: {id: user.id,}, };

        // Sign JWT
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' },(err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.userInformation = async (req, res) => {
    console.log("req.user.id",req.user.id)
    const id = req.user.id
    try {
    const user = await User.findOne({_id:id});
    console.log(user);
    if(!user){
        res.status(200).send({ message: 'User does not found.',success:false });
    }else{
        res.status(202).send({ user: user, success: true })
    }     
    } catch (error) {
        res.status(500).send({ error });
    }
}