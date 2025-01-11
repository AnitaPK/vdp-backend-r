
const mongoose = require("mongoose"); 

var appointmentSchema = new mongoose.Schema({
    patientName: String,
    doctorName:String,
    service:String,
    status: String,
    appointmentTime: String,
    appointmentDate: { type: Date, default: Date.now },
    appointmentDuration: String
  });
  

  module.exports = mongoose.model('Appointment', appointmentSchema);
