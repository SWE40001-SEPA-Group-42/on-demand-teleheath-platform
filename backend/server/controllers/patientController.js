// Handles the User Object API calls to the Back End
const asyncHandler = require('express-async-handler')
const Patient = require('../models/patient')

// GET - Patient
const getPatient = asyncHandler(async(req, res) => {

    const patientFirstName = req.body.patientFirstName
    const patientLastName = req.body.patientLastName
    
    const patient = await Patient.find({
        ptFirstName: patientFirstName,
        ptLastName: patientLastName
    })

    if (!patientFirstName || !patientLastName) {
        res.status(400)
        throw new Error(`Invalid Patient Details: Missing inputs found in the request!`)
    } 
    
    res.status(200).json(patient)
})

// POST - Patient
const addPatient = asyncHandler(async(req, res) => {


    const patient = await Patient.create({
        ptFirstName: req.body.ptFirstName,
        ptLastName: req.body.ptLastName,
        ptDOB: req.body.ptDOB,
        ptGender: req.body.ptGender,
        ptAddress: req.body.ptAddress,
        ptReference: req.body.ptReference,
        ptPhoneNo: req.body.ptPhoneNo,
        ptEmail: req.body.ptEmail,
        ptMedicareID: req.body.ptMedicareID
    })

    if (!patient) {
        res.status(400)
        throw new Error(`Invalid Patient Details: Missing inputs found in the request!`)
    }

    res.status(200).json(patient)
})

// PUT - Patient using ID
const modifyPatientByID = asyncHandler(async(req, res) => {
    const updatedPatient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
        }
    )

    if (!updatedPatient) {
        res.status(400)
        throw new Error(`Invalid Patient Search for update!`)
    }

    res.status(200).json(updatedPatient)
})

// PUT - Patient using ID
const modifyPatientByName = asyncHandler(async(req, res) => {
    
    const ptFirstName = req.body.ptFirstName
    const ptLastName = req.body.ptLastName
    
    const updatedPatient = await Patient.findOneAndUpdate(
        { 
            ptFirstName: ptFirstName, 
            ptLastName: ptLastName 
        },
        req.body, {
            new: true,
        }
    )

    if (!updatedPatient) {
        res.status(400)
        throw new Error(`Invalid Patient Search for update!`)
    }

    res.status(200).json(updatedPatient)
})

// DELETE - Patient using ID
const deletePatientByID = asyncHandler(async(req, res) => {
    const patient = await Patient.findById(req.params.id)

    if (!patient) {
        res.status(400)
        throw new Error(`Invalid Patient Search for delete!`)
    }

    await patient.remove()

    res.status(200).json(patient)

})

// DELETE - Patient using Name
const deletePatientByName = asyncHandler(async(req, res) => {
    const ptFirstName = req.body.ptFirstName
    const ptLastName = req.body.ptLastName
    
   
    const patient = await Patient.findOneAndRemove({
        ptFirstName: ptFirstName,
        ptLastName:  ptLastName
    })

    if (!patient) {
        res.status(400)
        throw new Error(`Invalid Patient Search for delete!`)
    }

    res.status(200).json(patient)
})



module.exports = {
    getPatient, addPatient, modifyPatientByID, modifyPatientByName, deletePatientByID, deletePatientByName
}