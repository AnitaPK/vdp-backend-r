const Appointment = require("../modals/appointmentModal"); 

// Controller function to add a new appointment
async function addAppointment(req, res) {
  try {
    const appointment = req.body;
    const appointmentDetails = {
      doctorName: appointment.doctorName,
      patientName: appointment.patientName,
      service: appointment.service,
      status: appointment.status,
      appointmentTime: appointment.appointmentTime,
      appointmentDate: appointment.appointmentDate,
      appointmentDuration: appointment.appointmentDuration,
    };

    console.log("Appointment Details:", appointmentDetails);

 
    const newDoc = new Appointment(appointmentDetails);

    const result = await newDoc.save();
    console.log("Added appointment to database:", result);
    res.status(200).json({ task: result });

  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

// Controller function to retrieve all appointments
async function getAllAppointment(req, res) {
  try {
     const docs = await Appointment.find({}, { _id: 0, __v: 0 });

    console.log("Appointment list collection:", docs);
    res.status(200).json(docs);

  } catch (error) {
    console.error("Error fetching all appointments:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

// Controller function to retrieve appointments by query
async function getAppointmentsByQuery(req, res) {
  try {
    const query = req.body;
    const docs = await Appointment.find(query, { _id: 0, __v: 0 });

    if (!docs.length) {
      console.log("No appointments found for query:", query);
      return res.status(404).json({ message: "No appointments found" });
    }

    console.log("Appointment list collection by query:", docs);
    res.status(200).json(docs);

  } catch (error) {
    console.error("Error fetching appointments by query:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

// Export the controller functions
module.exports = {
  addAppointment,
  getAllAppointment,
  getAppointmentsByQuery,
};
