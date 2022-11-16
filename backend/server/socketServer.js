require("dotenv").config();
const express = require("express");
const http = require("http");
const https = require("https");
const fs = require('fs');
const app = express();

let server = "";

// TODO Set up HTTPS https://betterprogramming.pub/deploy-mern-stack-app-on-aws-ec2-with-letsencrypt-ssl-8f463c01502a
// Will need to get a domain name https://www.youtube.com/watch?v=GKIIL743Gjo
if (process.env.NODE_ENV == "develop") {
  server = http.createServer(app);
} else {
  const privateKey = fs.readFileSync(
    `/etc/letsencrypt/live/${process.env.DOMAIN_NAME}/privkey.pem`,
    "utf8"
  ); // key
  const certificate = fs.readFileSync(
    `/etc/letsencrypt/live/${process.env.DOMAIN_NAME}/cert.pem`,
    "utf8"
  ); // certificate
  const ca = fs.readFileSync(
    `/etc/letsencrypt/live/${process.env.DOMAIN_NAME}/chain.pem`,
    "utf8"
  ); // chain
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
  server = https.createServer(credentials, app);
}

const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 2) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
    socket.broadcast.emit("user left", socket.id);
  });

  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", payload);
  });

  socket.on("ICEcandidate", (incoming) => {
    io.to(incoming.target).emit("ICEcandidate", incoming.candidate);
  });

  // socket.io("ICEcandidate", (incoming) => {
  //   // let otherUser = data.user;
  //   // let rtcMessage = data.rtcMessage;

  //   // socket.to(otherUser).emit("ICEcandidate", {
  //   //   sender: socket.user,
  //   //   rtcMessage: rtcMessage
  //   // })
  // }
});

server.listen(process.env.SOCKET_PORT || 8000, () =>
  console.log("server is running on port 8000")
);
