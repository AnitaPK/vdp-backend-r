const Prescription = require("../modals/prescriptionModal"); 

// Controller function to add a new prescription
async function addPrescription(req, res) {
  try {
    const prescription = req.body;
    console.log("Prescription Details:", prescription);

     const newDoc = new Prescription(prescription);

    const result = await newDoc.save();
    console.log("Added prescription to database:", result);
    res.status(200).json({ task: result });

  } catch (error) {
    console.error("Error adding prescription:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

// Controller function to retrieve prescriptions by query
async function getPrescriptions(req, res) {
  try {
    const query = req.body;
    const docs = await Prescription.find(query, { _id: 0, __v: 0 });

    if (!docs.length) {
      console.log("No prescriptions found for query:", query);
      return res.status(404).json({ message: "No prescriptions found" });
    }

    console.log("Prescription list collection by query:", docs);
    res.status(200).json(docs);

  } catch (error) {
    console.error("Error fetching prescriptions by query:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

// Export the controller functions
module.exports = {
  addPrescription,
  getPrescriptions,
};
