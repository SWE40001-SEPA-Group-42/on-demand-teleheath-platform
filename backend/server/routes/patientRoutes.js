const express = require('express')
const {
    getPatient, addPatient, 
    modifyPatientByID, modifyPatientByName, 
    deletePatientByID, deletePatientByName
} = require('../controllers/patientController')
const patientRouter = express.Router()

// CRUD Operations -> Patient
patientRouter.route('/')
    .get(getPatient)
    .post(addPatient)
    .put(modifyPatientByName)
    .delete(deletePatientByName)
patientRouter.route('/:id')
    .put(modifyPatientByID)
    .delete(deletePatientByID)

module.exports = patientRouter
