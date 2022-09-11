const { body, validationResult } = require('express-validator')

const clinicValidator = (validationType) => {
  if (validationType == 'clinicName') {
    return [
      body('clName').notEmpty().isString().withMessage(
        'must provide a valid clinic name'
      )
    ]
  } else if (validationType == 'clinicBody') {
    return [
      body('clName').isString().notEmpty().withMessage(
        'must provide a valid clinic name'
      ),
      body('clAddress').isString().notEmpty().withMessage(
        'must provide a valid clinic address'
      ),
      body('line1').isString().notEmpty().withMessage(
        'must provide a line 1 address'
      ),
      body('city').isString().notEmpty().withMessage(
        'must provide a city'
      ),
      body('postcode').isString().notEmpty().withMessage(
        'must provide a postcode'
      ),
      body('country').isString().notEmpty().withMessage(
        'must provide a country'
      ),
      body('clPhone').custom( value => {
        if (value.match(/\d/g).length===10) {
          return true
        } else {
          return false
        }
      }).withMessage(
        'must provide a valid clinic contact number'
      )
      .notEmpty().withMessage(
        'must provide a clinic contact number'
      ),
      body('clEmailAddress')
      .isEmail().withMessage(
        'must provide a valid clinic email address'
      )
      .notEmpty().withMessage(
        'must a clinic email address'
      )
    ]
  }
}

const doctorValidator = (validationType) => {
  // Work in Progress
  if (validationType == 'doctorName') {
    return true
  } else if (validationType == 'doctorBody') {
    return true
  }
}

const patientValidator = (validationType) => {
  // Work in Progress
  if (validationType == 'patientName') {
    return true
  } else if (validationType == 'patientBody') {
    return true
  }
}

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
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  clinicValidator,
  doctorValidator,
  patientValidator,
  validate,
}