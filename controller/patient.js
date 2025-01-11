const Patient = require("../modals/patientModal") 

// Controller function to add a new patient
async function addPatient(req, res) {
  try {
    const patient = req.body;
    const patientMapping = {
      initial: patient.nameTitle,
      name: patient.patientName,
      phoneNumber: patient.phoneNumber,
      gender: patient.gender,
      age: patient.age,
      dateOfBirth: patient.dateOfBirth,
      preferredLanguage: patient.selectedLanguage,
      isMore: false,
      bloodGroup: patient.bloodGroup,
      referredBy: patient.doctor,
      referredByDrSpecialty: patient.doctorSpeciality,
      email: patient.email,
      previousID: patient.previousId,
      address: patient.address,
      city: patient.city,
      pin: patient.pin,
      occupation: patient.occupation,
      tag: patient.tag,
      alternateMobile: patient.mobile2,
      image: patient.file,
    };

    console.log("Patient Mapping:", patientMapping);

    const newDoc = new Patient(patientMapping);

    const result = await newDoc.save();
    console.log("Added patient to database:", result);
    res.status(200).json({ task: result });

  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

// Controller function to retrieve all patients
async function getAllPatient(req, res) {
  try {
    const docs = await Patient.find({}, { _id: 0, __v: 0 });

    console.log("Patient list collection:", docs);
    res.status(200).json(docs);

  } catch (error) {
    console.error("Error fetching all patients:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

// Controller function to retrieve a patient by name
async function getPatientByName(req, res) {
  try {
    const { name } = req.params;
    const doc = await Patient.find({ name }, { _id: 0, __v: 0 });

    if (!doc) {
      console.log("Patient not found:", name);
      return res.status(404).json({ message: "Patient not found" });
    }

    console.log("Patient collection:", doc);
    res.status(200).json(doc);

  } catch (error) {
    console.error("Error fetching patient by name:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

// Export the controller functions
module.exports = {
  addPatient,
  getAllPatient,
  getPatientByName,
};