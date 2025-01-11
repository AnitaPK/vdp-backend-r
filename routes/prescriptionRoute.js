var express = require('express'),
   router = express.Router()
const prescriptionController = require('../controller/prescription')

router.post('/addPrescription',prescriptionController.addPrescription);
 
router.get('/getPrescriptions',prescriptionController.getPrescriptions);
 
// router.get('/prescription',getAllPrescription);

module.exports = router;
