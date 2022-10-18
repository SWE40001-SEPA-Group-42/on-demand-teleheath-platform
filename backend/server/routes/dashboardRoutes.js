const express = require("express");
const {
  searchForAppointment,
  createAppointment,
  updateAppointment,
  updateAppointmentByID,
  deleteAppointment,
  deleteAppointmentByID,
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
  .route("/appointment/:id")
  .put(
    dashboardValidator((validationType = "appointment")),
    validate,
    updateAppointmentByID
  )
  .delete(deleteAppointmentByID);

module.exports = dashboardRouter;
