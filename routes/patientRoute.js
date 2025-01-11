var express = require('express'),
   router = express.Router();
const patientController = require('../controller/patient');

// ***********************   patient   *********************** // 

router.post('/addPatient',patientController.addPatient );

router.get('/getAllPatients',patientController.getAllPatient );

router.get('/:name', patientController.getPatientByName);



module.exports = router;