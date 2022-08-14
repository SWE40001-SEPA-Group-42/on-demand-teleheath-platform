const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const clinicRoutes = require('./routes/clinicRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 8001 // Default port

const app = express()

// For Logging
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Error Handler --> Overwrites Default
app.use(errorHandler)

// Routes
app.use('/api/clinic', clinicRoutes)

app.listen(port, () => {
    console.log(`Web RTC Server initialised on port ${port}`)
    connectDB()
})
