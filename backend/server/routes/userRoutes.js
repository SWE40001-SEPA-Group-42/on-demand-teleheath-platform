const express = require('express')
const { 
    getClinic, addClinic, modifyClinic, deleteClinic,
    getDoctor, addDoctor, modifyDoctor, deleteDoctor,
    getPatient, addPatient, modifyPatient, deletePatient 
} = require('../controllers/userController')
const router = express.Router()

// CRUD Operations -> Clinic
router.route('/clinic/').get(getClinic).post(addClinic)
router.route('/clinic/:id').delete(deleteClinic).put(modifyClinic)

// CRUD Operations -> Doctor
router.route('/doctor/').get(getDoctor).post(addDoctor)
router.route('/doctor/:id').delete(deleteDoctor).put(modifyDoctor)

// CRUD Operations -> Patient
router.route('/patient/').get(getPatient).post(addPatient)
router.route('/patient/:id').delete(deletePatient).put(modifyPatient)

module.exports = router
