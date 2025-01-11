const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config({ path: './.env' });

const connectDB = require('./config/db')
connectDB();

// parse application/x-www-form-urlencoded
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// for testing purposes
const patientRoutes = require('./routes/patientRoute');
const appointmentRoutes = require('./routes/appointmentRoute');
const prescriptionRoutes = require('./routes/prescriptionRoute');
const userRoutes = require('./routes/userRoute');

// Import my test routes into the path '/test'
app.use('/api/patient', patientRoutes); // http://localhost:4000/api/auth/login
// app.use('/api/appointment', appointmentRoutes);
app.use('/api/prescription', prescriptionRoutes);
app.use('/api/auth', userRoutes);

// to show on port no 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
