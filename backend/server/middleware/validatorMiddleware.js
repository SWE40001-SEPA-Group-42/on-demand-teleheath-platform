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
        .notEmpty()
        .withMessage("must provide a clinic address"),
      body("clAddress.line1")
        .isString()
        .notEmpty()
        .withMessage("must provide a line 1 address that is valid"),
      body("clAddress.line2")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide valid line 2 address"),
      body("clAddress.city").isString().notEmpty().withMessage("must provide a city"),
      body("clAddress.state")
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
      body("clAddress.postcode")
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
      body("clAddress.country")
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
      body("drAddress").notEmpty().withMessage("must provide an address"),
      body("drAddress.line1")
        .isString()
        .notEmpty()
        .withMessage("must provide a line 1 address that is valid"),
      body("drAddress.line2")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide valid line 2 address"),
      body("drAddress.city").isString().notEmpty().withMessage("must provide a city"),
      body("drAddress.state")
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
      body("drAddress.postcode")
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
      body("drAddress.country")
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
        .withMessage("must provide a clinic that they work in"),
    ];
  }
};

const patientValidator = (validationType) => {
  // Work in Progress
  if (validationType == "patientName") {
    return [
      body("ptGivenName")
        .notEmpty()
        .isString()
        .withMessage("must provide a given name"),
      body("ptSurname")
        .notEmpty()
        .isString()
        .withMessage("must provide a surname"),
    ];
  } else if (validationType == "patientBody") {
    return [
      body("ptGivenName")
        .notEmpty()
        .isString()
        .withMessage("must provide a given name"),
      body("ptSurname")
        .notEmpty()
        .isString()
        .withMessage("must provide a surname"),
      body("ptPreferredName")
        .notEmpty()
        .isString()
        .withMessage("must provide a surname"),
      body("ptDOB")
        .notEmpty()
        .isDate()
        .withMessage("must provide a date of birth"),
      body("ptBirthSex")
        .notEmpty()
        .isString()
        .withMessage("must provide a gender"),
      body("ptEmailAddress")
        .isEmail()
        .withMessage("must provide a valid email address")
        .notEmpty()
        .withMessage("must provide a doctor's email address"),
      body("ptMobilePhone")
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
      body("ptHomePhone")
        .optional({ checkFalsy: true })
        .custom((value) => {
          if (value.match(/\d/g).length === 10) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("must provide a valid home number"),
      body("ptWorkPhone")
        .optional({ checkFalsy: true })
        .custom((value) => {
          if (value.match(/\d/g).length === 10) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("must provide a valid work number"),
      body("ptAddress").notEmpty().withMessage("must provide an address"),
      body("ptAddress.line1")
        .isString()
        .notEmpty()
        .withMessage("must provide a line 1 address that is valid"),
      body("ptAddress.line2")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide valid line 2 address"),
      body("ptAddress.city").isString().notEmpty().withMessage("must provide a city"),
      body("ptAddress.state")
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
      body("ptAddress.postcode")
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
      body("ptAddress.country")
        .isString()
        .notEmpty()
        .withMessage("must provide a country"),
      body("ptMedicareCardNo")
        .isString()
        .notEmpty()
        .withMessage("must provide a Medicare Card Number"),
      body("ptMedicareCardIRN")
        .optional({ checkFalsy: true })
        .isNumeric()
        .withMessage("must provide a Medicare IRN Number"),
      body("ptMedicareCardExpiryDate")
        .optional({ checkFalsy: true })
        .isDate()
        .withMessage("must provide a Medicare IRN Number"),
      body("ptPrivateHealthFund")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide a private health fund"),
      body("ptPrivateHealthFundNo")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide a private health fund number"),
      body("ptEmgContactGivenName")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide an emergency contact given name"),
      body("ptEmgContactSurname")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide an emergency contact surname"),
      body("ptEmgContactRelationship")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide an emergency contact relationship"),
      body("ptEmgContactMobilePhone")
        .optional({ checkFalsy: true })
        .custom((value) => {
          if (value.match(/\d/g).length === 10) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("must provide an emergency contact mobile number"),
      body("ptEmgContactHomePhone")
        .optional({ checkFalsy: true })
        .custom((value) => {
          if (value.match(/\d/g).length === 10) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("must provide an emergency contact home number"),
      body("ptEmgContactWorkPhone")
        .optional({ checkFalsy: true })
        .custom((value) => {
          if (value.match(/\d/g).length === 10) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("must provide an emergency contact work number"),
      body("ptNextOfKinGivenName")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide an emergency contact given name"),
      body("ptNextOfKinSurname")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide an emergency contact surname"),
      body("ptNextOfKinRelationship")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide an emergency contact relationship"),
      body("ptNextOfKinMobilePhone")
        .optional({ checkFalsy: true })
        .custom((value) => {
          if (value.match(/\d/g).length === 10) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("must provide a next of kin contact number"),
      body("ptNextOfKinHomePhone")
        .optional({ checkFalsy: true })
        .custom((value) => {
          if (value.match(/\d/g).length === 10) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("must provide a next of kin home number"),
      body("ptNextofKinWorkPhone")
        .optional({ checkFalsy: true })
        .custom((value) => {
          if (value.match(/\d/g).length === 10) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("must provide a next of kin work number"),
      body("ptDVAFileNo")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide an DVA File Number"),
      body("ptDVAExpiryDate")
        .optional({ checkFalsy: true })
        .isDate()
        .withMessage("must provide an DVA File Number"),
      body("ptHealthcareCardNo")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide an Healthcare Card Number"),
      body("ptHealthcareCardExpiryDate")
        .optional({ checkFalsy: true })
        .isDate()
        .withMessage("must provide an Healthcare Card expiry date"),
      body("ptPensionCardNo")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("must provide an Pension Card Number"),
      body("ptPensionCardExpiryDate")
        .optional({ checkFalsy: true })
        .isDate()
        .withMessage("must provide an Pension Card expiry date"),
    ];
  }
};

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
