const { body, validationResult } = require("express-validator");

const clinicValidator = (validationType) => {
  if (validationType == "clinicName") {
    return [
      body("clName")
        .notEmpty()
        .isString()
        .withMessage("must provide a valid clinic name"),
    ];
  } else if (validationType == "clinicBody") {
    return [
      body("clName")
        .isString()
        .notEmpty()
        .withMessage("must provide a valid clinic name"),
      body("clAddress")
        .isString()
        .notEmpty()
        .withMessage("must provide a valid clinic address"),
      body("line1")
        .isString()
        .notEmpty()
        .withMessage("must provide a line 1 address that is valid"),
      body("line2").isString().withMessage("must provide valid line 2 address"),
      body("city").isString().notEmpty().withMessage("must provide a city"),
      body("state")
        .custom((value) => {
          if (value.length === 3) {
            return true;
          } else {
            return false;
          }
        })
        .isString()
        .withMessage("invalid state length")
        .notEmpty()
        .withMessage("must provide a state"),
      body("postcode")
        .custom((value) => {
          if (value.match(/\d/g).length === 4) {
            return true;
          } else {
            return false;
          }
        })
        .isString()
        .notEmpty()
        .withMessage("must provide a postcode"),
      body("country")
        .isString()
        .notEmpty()
        .withMessage("must provide a country"),
      body("clPhone")
        .custom((value) => {
          if (value.match(/\d/g).length === 10) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("must provide a valid clinic contact number")
        .notEmpty()
        .withMessage("must provide a clinic contact number"),
      body("clEmailAddress")
        .isEmail()
        .withMessage("must provide a valid clinic email address")
        .notEmpty()
        .withMessage("must provide a clinic email address"),
    ];
  }
};

const doctorValidator = (validationType) => {
  // Work in Progress
  if (validationType == "doctorName") {
    return [
      body("drGivenName")
        .notEmpty()
        .isString()
        .withMessage("must provide a given name"),
      body("drSurname")
        .notEmpty()
        .isString()
        .withMessage("must provide a surname"),
    ];
  } else if (validationType == "doctorBody") {
    return [
      body("drGivenName")
        .notEmpty()
        .isString()
        .withMessage("must provide a given name"),
      body("drSurname")
        .notEmpty()
        .isString()
        .withMessage("must provide a surname"),
      body("drPreferredName")
        .notEmpty()
        .isString()
        .withMessage("must provide a surname"),
      body("drDOB")
        .notEmpty()
        .isDate()
        .withMessage("must provide a date of birth"),
      body("drBirthSex")
        .notEmpty()
        .isString()
        .withMessage("must provide a gender"),
      body("drEmail")
        .isEmail()
        .withMessage("must provide a valid email address")
        .notEmpty()
        .withMessage("must provide a doctor's email address"),
      body("drPhone")
        .custom((value) => {
          if (value.match(/\d/g).length === 10) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("must provide a valid contact number")
        .notEmpty()
        .withMessage("must provide a contact number"),
      body("drAddress")
        .isString()
        .notEmpty()
        .withMessage("must provide a valid address"),
      body("line1")
        .isString()
        .notEmpty()
        .withMessage("must provide a line 1 address that is valid"),
      body("line2").isString().withMessage("must provide valid line 2 address"),
      body("city").isString().notEmpty().withMessage("must provide a city"),
      body("state")
        .custom((value) => {
          if (value.length === 3) {
            return true;
          } else {
            return false;
          }
        })
        .isString()
        .withMessage("invalid state length")
        .notEmpty()
        .withMessage("must provide a state"),
      body("postcode")
        .custom((value) => {
          if (value.match(/\d/g).length === 4) {
            return true;
          } else {
            return false;
          }
        })
        .isString()
        .notEmpty()
        .withMessage("must provide a postcode"),
      body("country")
        .isString()
        .notEmpty()
        .withMessage("must provide a country"),
      body("drCode")
        .isString()
        .notEmpty()
        .withMessage("must provide a Doctor Code"),
      body("drPrescriberNo")
        .isString()
        .notEmpty()
        .withMessage("must provide a Prescriber Number"),
      body("drQualifications")
        .isString()
        .notEmpty()
        .withMessage("must provide a qualification"),
      body("drLanguagesSpoken")
        .isString()
        .notEmpty()
        .withMessage("must provide a list of languages spoken"),
      body("drClinicName")
        .isString()
        .notEmpty()
        .withMessage("must provide a clinic that they work in")
    ];
  }
};

const patientValidator = (validationType) => {
  // Work in Progress
  if (validationType == "patientName") {
    return true;
  } else if (validationType == "patientBody") {
    return true;
  }
};

/* 
  body('clURL').custom( value => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }).withMessage(
    'must provide a valid clinic URL'
  )
*/

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  clinicValidator,
  doctorValidator,
  patientValidator,
  validate,
};
