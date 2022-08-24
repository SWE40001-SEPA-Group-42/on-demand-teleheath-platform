const express = require('express')
const {
    getDoctor, addDoctor, 
    modifyDoctorByID, modifyDoctorByName, 
    deleteDoctorByID, deleteDoctorByName
} = require('../controllers/doctorController')
const doctorRouter = express.Router()

// CRUD Operations -> Doctor
doctorRouter.route('/')
    .get(getDoctor)
    .post(addDoctor)
    .put(modifyDoctorByName)
    .delete(deleteDoctorByName)
doctorRouter.route('/:id')
    .put(modifyDoctorByID)
    .delete(deleteDoctorByID)

module.exports = doctorRouter