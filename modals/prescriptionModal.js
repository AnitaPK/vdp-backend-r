
const mongoose = require("mongoose"); 

const vitals = new mongoose.Schema({ 
  lbp: { type: String, required: false },
  hbp: { type: String, required: false },
  pulse:{ type: String, required: false },
  height: { type: String, required: false },
  weight: { type: String, required: false },
  temperature: { type: String, required: false },
  bmi: { type: String, required: false },
  waistHip: { type: String, required: false },
  spo2: { type: Number, required: false }
})

const medicine = new mongoose.Schema({ 
  type: { type: String, required: false },
  medicineName: { String: String, required: false },
  doses: { type: String, required: false },
  when: { type: String, required: false },
  frequency: { type: String, required: false },
  duration: { type: String, required: false },
  quantity: { type: String, required: false },
  notes: { type: String, required: false }
})

const referred = new mongoose.Schema({ 
  doctorName: { type: String, required: false },
  doctorSpeciality: { type: String, required: false },
  email: { String: String, required: false },
  phoneNumber: { type: String, required: false }
})

const systematicExamination = new mongoose.Schema({ 
  general: { type: String, required: false },
  cvs: { String: String, required: false },
  rs: { String: String, required: false },
  cns: { String: String, required: false },
  pa: { String: String, required: false },
  ent: { String: String, required: false }
})

const investigations = new mongoose.Schema({ 
  investigations: { type: String, required: false },
  units: { String: String, required: false },
  today: { String: String, required: false }
})

var prescriptionSchema = new mongoose.Schema({
  patientId:{ type: String, required: false },
  patientName:{ type: String, required: false },
  visitNumber:{ type: Number, required: false },
  vitals: { type: vitals, required: false },
  complaints:{ type: String, required: false },
  pastHistory: { type: String, required: false },
  investigations : { type: [investigations], required: false },
  diagnosis:{ type: String, required: false },
  preferredLanguage: { type: String, required: false },
  medicine: { type: [medicine], required: false },
  advice: { type: String, required: false },
  testRequested: { type: String, required: false },
  testRequestedByWhen : { type: String, required: false },
  // nextVisit: { type: Date, required: false },
  nextVisit: { type: String, required: false },
  referredTo: { type: [referred], required: false },
  systematicExamination:{type: systematicExamination , required: false }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);