const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require("http");
const https = require("https");
const fs = require('fs');
const { connectDB, closeDB } = require("./config/db");
const userController = require("./controllers/userController");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const { resolveSoa } = require("dns/promises");

const port = process.env.PORT || 8001; // Default port

const app = express();

// TODO - Set up HTTPS https://betterprogramming.pub/deploy-mern-stack-app-on-aws-ec2-with-letsencrypt-ssl-8f463c01502a
// Will need to get a domain name https://www.youtube.com/watch?v=GKIIL743Gjo
let server = "";

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

// For Logging
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error Handler --> Overwrites Default
app.use(errorHandler);

// Routes
app.use("/api/clinics", clinicRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/users", userController);
app.use("/api/dashboard", dashboardRoutes);

//Establish connection - TODO Move this and app.listen from the server.js to separate file (get's called multiple times in the test)
connectDB();

server.listen(port, () => {
  console.log(`Web RTC Server initialised on port ${port}`);
});

module.exports = { app, connectDB, closeDB };
