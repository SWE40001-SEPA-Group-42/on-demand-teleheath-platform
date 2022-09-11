const { body, validationResult } = require('express-validator')

const clinicValidator = (validationType) => {
  // Work in Progress
  if (validationType == 'clinicName') {
    return [
      body('clinicName').isString().withMessage(
        'must provide a valid clinic name'
      )
      // body('clinicName')
    ]
  } else if (validationType == 'clinicBody') {
    return [
      body('clinicName').isString().withMessage(
        'must provide a valid clinic name'
      ),
      body('clinicAddress').isString().withMessage(
        'must provide a valid clinic address'
      ),
      body('clinicContactNumber').custom( value => {
        if (value.match(/\d/g).length===10) {
          return true
        } else {
          return false
        }
      }).withMessage(
        'must provide a valid clinic contact number'
      ),
      body('clinicUrl').custom( value => {
        try {
          new URL(value)
          return true
        } catch {
          return false
        }
      }).withMessage(
        'must provide a valid clinic URL'
      )
    ]
  }
}

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
  validate,
}