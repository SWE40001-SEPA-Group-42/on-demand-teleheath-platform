const express = require('express')
const {
    getDoctor, getAvailDoctor, addDoctor,
    modifyDoctorByID, modifyDoctorByName, 
    deleteDoctorByID, deleteDoctorByName
} = require('../controllers/doctorController')
const { doctorValidator, validate } = require('../middleware/validatorMiddleware')
const doctorRouter = express.Router()

// CRUD Operations -> Doctor
doctorRouter.route('/')
    .get(getDoctor)
    // .post(doctorValidator(validationType = 'doctorBody'), validate, addDoctor)
    .post(addDoctor)
    .put(doctorValidator(validationType = 'doctorBody'), validate, modifyDoctorByName)
    .delete(doctorValidator(validationType = 'doctorName'), validate, deleteDoctorByName)
doctorRouter.route('/status/')
    .get(getAvailDoctor)
doctorRouter.route('/:id')
    .put(doctorValidator(validationType = 'doctorBody'), validate, modifyDoctorByID)
    .delete(deleteDoctorByID)

module.exports = doctorRouter