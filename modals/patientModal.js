const mongoose = require("mongoose"); 

var patientSchema = new mongoose.Schema({
  
  initial: { type: String, required: false },
  name:{ type: String, required: false },
  phoneNumber:{ type: String, required: false },
  gender: { type: String, required: false },
  age: { type: Number, required: false },
  dateOfbirth:{ type: Date, required: false }, 
  preferredLanguage: { type: String, required: false },
  isMore: { type: Boolean, required: false },


  bloodGroup: { type: String, required: false },
  referredBy: { type: String, required: false },
  referredBydDrSpecialty: { type: String, required: false },
  email: { type: String, required: false },
  previousID:{ type: String, required: false },
  address:{ type: String, required: false },
  city:{ type: String, required: false },
  pin: { type: String, required: false },
  Occupation:{ type: String, required: false },
  Tag:{ type: String, required: false },
  alternateMobile:{ type: String, required: false },
  Occupation:{ type: String, required: false },
  image: { type: String, required: false },
  appointments: {type : mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: false }
});

module.exports = mongoose.model('Patient', patientSchema);
