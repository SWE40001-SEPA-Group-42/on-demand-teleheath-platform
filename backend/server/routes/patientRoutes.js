const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const {
  getPatient,
  addPatient,
  modifyPatientByID,
  modifyPatientByName,
  deletePatientByID,
  deletePatientByName,
} = require("../controllers/patientController");
const {
  patientValidator,
  validate,
} = require("../middleware/validatorMiddleware");
const patientRouter = express.Router();

function authenticateUserToken(res, req, next) {

  // Read and access the JWT access token from the header of a request
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401).json({
      message: "Bad or Missing Token",
    }); // Return 401 if no token
  }

  // Verify the token using the Userfront public key
  jwt.verify(token, process.env.USERFRONT_PUBLIC_KEY, (err, auth) => {
    if (err)
      return res.sendStatus(401).json({
        message: "Unable to verify Token",
      }); // Return 401 if token can't be verified
    req.auth = auth;
    next();
  });
}

// CRUD Operations -> Patient
patientRouter
  .route("/")
  .get(
    patientValidator((validationType = "patientName")),
    validate,
    authenticateUserToken,
    getPatient
  )
  .post(
    patientValidator((validationType = "patientBody")),
    validate,
    authenticateUserToken,
    addPatient
  )
  .put(
    patientValidator((validationType = "patientBody")),
    validate,
    authenticateUserToken,
    modifyPatientByName
  )
  .delete(
    patientValidator((validationType = "patientName")),
    validate,
    authenticateUserToken,
    deletePatientByName
  );
patientRouter
  .route("/:id")
  .put(
    patientValidator((validationType = "patientName")),
    validate,
    authenticateUserToken,
    modifyPatientByID
  )
  .delete(
    authenticateUserToken, 
    deletePatientByID
  );

module.exports = patientRouter;
