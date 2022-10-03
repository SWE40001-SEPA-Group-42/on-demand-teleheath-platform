const express = require("express");
const {
  getDoctor,
  getAvailDoctor,
  addDoctor,
  modifyDoctorByID,
  modifyDoctorByName,
  deleteDoctorByID,
  deleteDoctorByName,
} = require("../controllers/doctorController");
const {
  doctorValidator,
  validate,
} = require("../middleware/validatorMiddleware");
const doctorRouter = express.Router();

const jwt = require("jsonwebtoken");
function authenticateUserToken(req, req, next) {
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

// CRUD Operations -> Doctor
doctorRouter
  .route("/")
  .get(
    doctorValidator((validationType = "doctorName")),
    validate,
    authenticateUserToken,
    getDoctor
  )
  .post(
    doctorValidator((validationType = "doctorBody")),
    validate,
    authenticateUserToken,
    addDoctor
  )
  .put(
    doctorValidator((validationType = "doctorBody")),
    validate,
    authenticateUserToken,
    modifyDoctorByName
  )
  .delete(
    doctorValidator((validationType = "doctorName")),
    validate,
    authenticateUserToken,
    deleteDoctorByName
  );
doctorRouter.route("/status/").get(getAvailDoctor);
doctorRouter
  .route("/:id")
  .put(
    doctorValidator((validationType = "doctorBody")),
    validate,
    authenticateUserToken,
    modifyDoctorByID
  )
  .delete(authenticateUserToken, deleteDoctorByID);

module.exports = doctorRouter;
