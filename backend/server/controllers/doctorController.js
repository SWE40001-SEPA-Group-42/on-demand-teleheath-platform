const asyncHandler = require('express-async-handler')
const Doctor = require('../models/doctor')

// GET - Doctor
const getDoctor = asyncHandler(async(req, res) => {

    const doctorFirstName = req.body.drFirstName
    const doctorLastName = req.body.drSurName

    const doctor = await Doctor.find({
        drFirstName: doctorFirstName,
        drSurName: doctorLastName
    })

    if (!doctorFirstName) {
        res.status(400)
        throw new Error(`Invalid Doctor Details: Missing inputs found in the request!`)
    }

    res.status(200).json(doctor)
})

// POST - Doctor
const addDoctor = asyncHandler(async(req, res) => {

    const doctor = await Doctor.create({
        drFirstName: req.body.drFirstName,
        drSurName: req.body.drSurName,
        drCode: req.body.drCode,
        prescriberCode: req.body.prescriberCode,
        drAddress: req.body.drAddress,
        drPhoneNo: req.body.drPhoneNo,
        drEmail: req.body.drEmail,
        drClinic: req.body.drClinic
    })

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Details: Missing inputs found in the request!`)
    }

    res.status(200).json(doctor)
})

// PUT - Doctor using ID
const modifyDoctorByID = asyncHandler(async(req, res) => {
    
    const updatedDoctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
        }
    )

    if (!updatedDoctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for update!`)
    }

    res.status(200).json(updatedDoctor)
})

// PUT - Doctor using FirstName LastName
const modifyDoctorByName = asyncHandler(async(req, res) => {

    const drFirstName = req.body.drFirstName
    const drLastName = req.body.drSurName
    
    const updatedDoctor = await Doctor.findOneAndUpdate(
        { 
            drFirstName: drFirstName, 
            drLastName: drLastName 
        },
        req.body, {
            new: true,
        }
    )

    if (!updatedDoctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for update!`)
    }

    res.status(200).json(updatedDoctor)
})

// DELETE - Doctor using ID
const deleteDoctorByID = asyncHandler(async(req, res) => {
    const doctor = await Doctor.findById(req.params.id)

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for update!`)
    }

    await doctor.remove()
    res.status(200).json(doctor)
})

// DELETE - Doctor using Name
const deleteDoctorByName = asyncHandler(async(req, res) => {
    const drFirstName = req.body.drFirstName
    const drLastName = req.body.drSurName
    const doctor = await Doctor.findOneAndRemove({
        drFirstName: drFirstName,
        drLastName: drLastName
    })

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for delete!`)
    }

    res.status(200).json(doctor)
})

module.exports = {
    getDoctor, addDoctor, modifyDoctorByID, modifyDoctorByName, deleteDoctorByID, deleteDoctorByName
}