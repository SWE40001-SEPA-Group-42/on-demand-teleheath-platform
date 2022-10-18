const express = require("express");
const {
  getClinic,
  addClinic,
  updateClinicByID,
  updateClinicByName,
  deleteClinicByID,
  deleteClinicByName,
} = require("../controllers/clinicController");
const {
  clinicValidator,
  validate,
} = require("../middleware/validatorMiddleware");
const clinicRouter = express.Router();

// CRUD Operations -> Clinic
clinicRouter
  .route("/")
  .get(clinicValidator((validationType = "clinicName")), validate, getClinic)
  .post(clinicValidator((validationType = "clinicBody")), validate, addClinic)
  .put(
    clinicValidator((validationType = "clinicBody")),
    validate,
    updateClinicByName
  )
  .delete(
    clinicValidator((validationType = "clinicName")),
    validate,
    deleteClinicByName
  );
clinicRouter
  .route("/:id")
  .put(
    clinicValidator((validationType = "clinicBody")),
    validate,
    updateClinicByID
  )
  .delete(deleteClinicByID);

module.exports = clinicRouter;
