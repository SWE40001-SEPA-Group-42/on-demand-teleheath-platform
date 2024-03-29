const express = require("express");
const {
  searchForAppointment,
  checkForAppointmentStatus,
  updateAppointmentStatus,
  createAppointment,
  updateAppointment,
  updateAppointmentByID,
  deleteAppointment,
  deleteAppointmentByID,
  searchForAppointmentByDoctor
} = require("../controllers/dashboardController");
const {
  dashboardValidator,
  validate,
} = require("../middleware/validatorMiddleware");
const dashboardRouter = express.Router();

// CRUD Operations -> Clinic
dashboardRouter
  .route("/appointment/")
  .get(
    dashboardValidator((validationType = "appointmentParticipants")),
    validate,
    searchForAppointment
  )
  .post(
    dashboardValidator((validationType = "appointment")),
    validate,
    createAppointment
  )
  .put(
    dashboardValidator((validationType = "appointment")),
    validate,
    updateAppointment
  )
  .delete(
    dashboardValidator((validationType = "appointmentParticipants")),
    validate,
    deleteAppointment
  );
dashboardRouter
  .route("/appointment/status/")
  .get(checkForAppointmentStatus)
  .put(
    dashboardValidator((validationType = "appointmentUpdate")),
    validate,
    updateAppointmentStatus
  );
dashboardRouter
  .route("/appointment/:id")
  .put(
    dashboardValidator((validationType = "appointment")),
    validate,
    updateAppointmentByID
  )
  .delete(deleteAppointmentByID);
dashboardRouter
  .route("/appointment/doctor")
  .get(
    searchForAppointmentByDoctor
  )
module.exports = dashboardRouter;
