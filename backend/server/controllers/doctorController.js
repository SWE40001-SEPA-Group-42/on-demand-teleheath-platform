// Handles the Doctor Object API calls to the Back End
const asyncHandler = require('express-async-handler')
const Doctor = require('../models/doctor')

// GET - Doctor
const getDoctor = asyncHandler(async(req, res) => {

    const drGivenName = req.query.drGivenName
    const drSurname = req.query.drSurname

    const doctor = await Doctor.find({
        drGivenName: drGivenName,
        drSurname: drSurname
    })

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Details: Missing inputs found in the request!`)
    } else {
        res.status(200).json(doctor)
    }
})

const getAvailDoctor = asyncHandler(async(req, res) => {

    const drAvail = req.body.drAvail

    const doctor = await Doctor.find({
        drAvail: true
    })

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Details: Missing inputs found in the request!`)
    } else {
        res.status(200).json(doctor)
    }

})

// POST - Doctor
const addDoctor = asyncHandler(async(req, res) => {

    const doctor = await Doctor.create({
        drGivenName: req.body.drGivenName,
        drSurname: req.body.drSurname,
        drPreferredName: req.body.drPreferredName,
        drDOB: req.body.drDOB,
        drBirthSex : req.body.drBirthSex,
        drEmail: req.body.drEmail,
        drPhone: req.body.drPhone,
        drAddress: req.body.drAddress,
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
        country: req.body.country,
        drCode: req.body.drCode,
        drPrescriberNo: req.body.drPrescriberNo,
        drQualifications: req.body.drQualifications,
        drLanguagesSpoken: req.body.drLanguagesSpoken,
        drClinicName: req.body.drClinicName,
        drAvail: req.body.drAvail
    })

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Details: Missing inputs found in the request!`)
    } else {
        res.status(200).json(doctor)
    }
})

// PUT - Doctor using ID
const modifyDoctorByID = asyncHandler(async(req, res) => {
    
    const updatedDoctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
            runValidators: true, 
            context: 'query' 
        }
    )

    if (!updatedDoctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for update!`)
    } else {
        res.status(200).json(updatedDoctor)
    }
})

// PUT - Doctor using FirstName LastName
const modifyDoctorByName = asyncHandler(async(req, res) => {

    const drGivenName = req.body.drGivenName
    const drSurname = req.body.drSurname
    
    const updatedDoctor = await Doctor.findOneAndUpdate(
        { 
            drGivenName: drGivenName, 
            drSurname: drSurname 
        },
        req.body, {
            new: true,
        }
    )

    if (!updatedDoctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for update!`)
    } else {
        res.status(200).json(updatedDoctor)
    }
})

// DELETE - Doctor using ID
const deleteDoctorByID = asyncHandler(async(req, res) => {
    const doctor = await Doctor.findById(req.params.id)

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for update!`)
    } else {
        await doctor.remove()
        res.status(200).json(doctor)
    }
})

// DELETE - Doctor using Name
const deleteDoctorByName = asyncHandler(async(req, res) => {
    const drGivenName = req.body.drGivenName
    const drSurname = req.body.drSurname
    const doctor = await Doctor.findOneAndRemove({
        drGivenName: drGivenName,
        drSurname: drSurname
    })

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for delete!`)
    } else {
        res.status(200).json(doctor)
    }
})

module.exports = {
    getDoctor, getAvailDoctor, addDoctor, 
    modifyDoctorByID, modifyDoctorByName, 
    deleteDoctorByID, deleteDoctorByName
}