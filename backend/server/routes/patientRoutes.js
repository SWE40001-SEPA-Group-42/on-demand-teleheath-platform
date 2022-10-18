const express = require("express");
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

// CRUD Operations -> Patient
patientRouter
  .route("/")
  .get(patientValidator((validationType = "patientName")), validate, getPatient)
  .post(
    patientValidator((validationType = "patientBody")),
    validate,
    addPatient
  )
  .put(
    patientValidator((validationType = "patientBody")),
    validate,
    modifyPatientByName
  )
  .delete(
    patientValidator((validationType = "patientName")),
    validate,
    deletePatientByName
  );
patientRouter
  .route("/:id")
  .put(
    patientValidator((validationType = "patientName")),
    validate,
    modifyPatientByID
  )
  .delete(deletePatientByID);

module.exports = patientRouter;
