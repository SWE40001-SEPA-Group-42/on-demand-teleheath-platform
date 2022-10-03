const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const http = require('http')
const { connectDB, closeDB } = require('./config/db')
const userController = require('./controllers/userController')
const doctorRoutes = require('./routes/doctorRoutes')
const patientRoutes = require('./routes/patientRoutes')
const clinicRoutes = require('./routes/clinicRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 8001 // Default port

const app = express()
const server = http.createServer(app)

// For Logging
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Error Handler --> Overwrites Default
app.use(errorHandler)

// For Testing --> Will use Firebase so that it is serverless
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    socket.emit('Current User', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit("callended")
    })

    socket.on('calluser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("calluser", { signal: signalData, from, name })
    })

    socket.on('answercall', ({ data }) => {
        io.to(data.to).emit("callaccepted", data.signal)
    })
})

// Routes
app.use('/api/clinics', clinicRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/users', userController)

//Establish connection - TODO Move this and app.listen from the server.js to separate file (get's called multiple times in the test)
connectDB()

app.listen(port, () => {
    console.log(`Web RTC Server initialised on port ${port}`)
})


module.exports = { app, connectDB, closeDB }