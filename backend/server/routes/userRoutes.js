const express = require('express')
const clinics = require('../controllers/clinics')
const {
    modifyClinicByName, deleteClinicByID, deleteClinicByName,
    getDoctor, addDoctor, modifyDoctorByID, modifyDoctorByName, deleteDoctorByID, deleteDoctorByName,
    getPatient, addPatient, modifyPatientByID, modifyPatientByName, deletePatientByID, deletePatientByName
} = require('../controllers/userController')
const router = express.Router()

// CRUD Operations -> Clinic
router.route('/clinic/')
    .put(modifyClinicByName)
    .delete(deleteClinicByName)
router.route('/clinic/:id')
    .delete(deleteClinicByID)

// CRUD Operations -> Doctor
router.route('/doctor/')
    .get(getDoctor)
    .post(addDoctor)
    .put(modifyDoctorByName)
    .delete(deleteDoctorByName)
router.route('/doctor/:id')
    .put(modifyDoctorByID)
    .delete(deleteDoctorByID)

// CRUD Operations -> Patient
router.route('/patient/')
    .get(getPatient)
    .post(addPatient)
    .put(modifyPatientByName)
    .delete(deletePatientByName)
router.route('/patient/:id')
    .put(modifyPatientByID)
    .delete(deletePatientByID)

module.exports = router
