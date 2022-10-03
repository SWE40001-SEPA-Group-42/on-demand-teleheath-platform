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
const { app } = require("../server");
const clinicRouter = express.Router();

const jwt = require("jsonwebtoken");
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

// && process.env.NODE_ENV == 'develop'

// CRUD Operations -> Clinic
clinicRouter
  .route("/")
  .get(
    clinicValidator((validationType = "clinicName")),
    validate,
    authenticateUserToken,
    getClinic
  )
  .post(
    clinicValidator((validationType = "clinicBody")),
    validate,
    authenticateUserToken,
    addClinic
  )
  .put(
    clinicValidator((validationType = "clinicBody")),
    validate,
    authenticateUserToken,
    updateClinicByName
  )
  .delete(
    clinicValidator((validationType = "clinicName")),
    validate,
    authenticateUserToken,
    deleteClinicByName
  );
clinicRouter
  .route("/:id")
  .put(
    clinicValidator((validationType = "clinicBody")),
    validate,
    authenticateUserToken,
    updateClinicByID
  )
  .delete(
    authenticateUserToken, 
    deleteClinicByID
  );

module.exports = clinicRouter;
