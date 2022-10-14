const express = require('express')
const dotenv = require('dotenv').config()
const cors = require("cors");
const http = require('http')
const { connectDB, closeDB } = require('./config/db')
const userController = require('./controllers/userController')
const doctorRoutes = require('./routes/doctorRoutes')
const patientRoutes = require('./routes/patientRoutes')
const clinicRoutes = require('./routes/clinicRoutes')
const { errorHandler } = require('./middleware/errorMiddleware');
const { resolveSoa } = require('dns/promises');

const port = process.env.PORT || 8001 // Default port

const app = express()
const server = http.createServer(app)

// For Logging
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Error Handler --> Overwrites Default
app.use(errorHandler)
app.use(cors())

// For Testing --> Will use Firebase so that it is serverless
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

// app.get('/video', (req, res) => {
//     res.redirect(`video/${uuidV4()}`)
// }) 

// app.get('/video/:room', (req, res) => {
//     res.json({ roomId: req.params.room })
// })
const users = {};

const socketToRoom = {};

io.on('connection', (socket) => {
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 3) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        console.log("hello")
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });
})


// Routes
app.use('/api/clinics', clinicRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/users', userController)

//Establish connection - TODO Move this and app.listen from the server.js to separate file (get's called multiple times in the test)
connectDB()

server.listen(port, () => {
    console.log(`Web RTC Server initialised on port ${port}`)
})


module.exports = { app, connectDB, closeDB }