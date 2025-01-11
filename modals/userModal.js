// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    isDoctor: { type: Boolean, default: false },
    specialization: { type: String, required: function() { return this.isDoctor; } },
    fullName: { type: String, required: function() { return this.isDoctor; } },
    email: { type: String, required: true, unique: true },
    pinCode: { type: String, required: function() { return this.isDoctor; } },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
