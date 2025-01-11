var express = require('express'),
 router = express.Router();
const appointmentController = require('../controller/appointment');


router.post('/appointments/addAppointment', appointmentController.addAppointment );
 
router.get('/getAppointments', appointmentController.getAppointmentsByQuery);

router.get('/getAllAppointment', appointmentController.getAllAppointment)


module.exports = router;
