const express = require('express')
const dotenv = require('dotenv').config()
const { connectDB, closeDB } = require('./config/db')
// const userRoutes = require('./routes/userRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const patientRoutes = require('./routes/patientRoutes')
const clinicRoutes = require('./routes/clinicRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

// const usersRouter = require('./controllers/users')
// const clinicRouter = require('./controllers/clinics')
// const patientRouter = require('./controllers/users')
// const doctorRouter = require('./controllers/users')


const port = process.env.PORT || 8001 // Default port

const app = express()

// For Logging
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Error Handler --> Overwrites Default
app.use(errorHandler)

// Routes
app.use('/api/clinics', clinicRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/patients', patientRoutes)

//Establish connection - TODO Move this and app.listen from the server.js to separate file (get's called multiple times in the test)
connectDB()

app.listen(port, () => {
    console.log(`Web RTC Server initialised on port ${port}`)
})


module.exports = { app, connectDB, closeDB }