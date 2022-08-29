const express = require('express')
const {
    getClinic, addClinic, 
    updateClinicByID, updateClinicByName, 
    deleteClinicByID, deleteClinicByName
} = require('../controllers/clinicController')
const clinicRouter = express.Router()

// CRUD Operations -> Clinic
clinicRouter.route('/')
    .get(getClinic)
    .post(addClinic)
    .put(updateClinicByName)
    .delete(deleteClinicByName)
clinicRouter.route('/:id')
    .put(updateClinicByID)
    .delete(deleteClinicByID)

module.exports = clinicRouter