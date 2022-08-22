// Handles the Clinic Object API calls to the Back End
const asyncHandler = require('express-async-handler')
const { clinicModel, doctorModel, patientModel } = require('../models/userModels')

// GET - Clinic
const getClinic = asyncHandler(async(req, res) => {
    const clinicName = req.body.clinicName
    
    const clinic = await clinicModel.find({clinicName: clinicName})

    if (!clinicName) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    } 
    
    res.status(200).json(clinic)
})

// POST - Clinic
const addClinic = asyncHandler(async(req, res) => {

    const clinic = await clinicModel.create({
        clinicName: req.body.clinicName,
        clinicAddress: req.body.clinicAddress,
        clinicContactNumber: req.body.clinicContactNumber,
        clinicUrl: req.body.clinicUrl
    })

    if (!clinic) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    }

    res.status(200).json(clinic)
})

// PUT - Clinic using ID
const modifyClinicByID = asyncHandler(async(req, res) => {
    const updatedClinic = await clinicModel.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
        }
    )

    if (!updatedClinic) {
        res.status(400)
        throw new Error(`Invalid Clinic Search for update!`)
    }

    res.status(200).json(updatedClinic)
})

// PUT - Clinic using Name
const modifyClinicByName = asyncHandler(async(req, res) => {
    const clinicName = req.body.clinicName

    const updatedClinic = await clinicModel.findOneAndUpdate(
        { 
            clinicName: clinicName
        },
        req.body, {
            new: true,
        }
    )

    if (!updatedClinic) {
        res.status(400)
        throw new Error(`Invalid Clinic Search for update!`)
    }

    res.status(200).json(updatedClinic)
})

// DELETE - Clinic using ID
const deleteClinicByID = asyncHandler(async(req, res) => {
    const clinic = await clinicModel.findById(req.params.id)
    if (!clinic) {
        res.status(400)
        throw new Error(`Invalid Clinic Search for update!`)
    }
    await clinic.remove()

    res.status(200).json(clinic)
})

// DELETE - Clinic using name
const deleteClinicByName = asyncHandler(async(req, res) => {
    const clinicName = req.body.clinicName
    const clinic = await clinicModel.findOneAndRemove({clinicName: clinicName})


    if (!clinic) {
        res.status(400)
        throw new Error(`Invalid Clinic Search for update!`)
    }

    res.status(200).json(clinic)
})

// Handles the Doctor Object API calls to the Back End

// GET - Doctor
const getDoctor = asyncHandler(async(req, res) => {

    const doctorFirstName = req.body.drFirstName
    const doctorLastName = req.body.drSurName

    const doctor = await doctorModel.find({
        drSurName: doctorLastName,
        drFirstName: doctorFirstName
    })

    if (!doctorFirstName) {
        res.status(400)
        throw new Error(`Invalid Doctor Details: Missing inputs found in the request!`)
    } 
    
    res.status(200).json(doctor)
})

// POST - Doctor
const addDoctor = asyncHandler(async(req, res) => {

    const doctor = await doctorModel.create({
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
    
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
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

// PUT - Patient using ID
const modifyDoctorByName = asyncHandler(async(req, res) => {

    const drFirstName = req.body.drFirstName
    const drLastName = req.body.drSurName
    
    const updatedDoctor = await doctorModel.findOneAndUpdate(
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
    const doctor = await doctorModel.findById(req.params.id)

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
    const doctor = await doctorModel.findOneAndRemove({
        drFirstName: drFirstName,
        drLastName: drLastName
    })

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for delete!`)
    }

    res.status(200).json(doctor)
})

// GET - Patient
const getPatient = asyncHandler(async(req, res) => {

    const patientFirstName = req.body.patientFirstName
    const patientLastName = req.body.patientLastName
    
    const patient = await patientModel.find({
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


    const patient = await patientModel.create({
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
    const updatedPatient = await patientModel.findByIdAndUpdate(
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
    
    const updatedPatient = await patientModel.findOneAndUpdate(
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
    const patient = await patientModel.findById(req.params.id)

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
    
   
    const patient = await patientModel.findOneAndRemove({
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
    getClinic, addClinic, modifyClinicByID, modifyClinicByName, deleteClinicByID, deleteClinicByName,
    getDoctor, addDoctor, modifyDoctorByID, modifyDoctorByName, deleteDoctorByID, deleteDoctorByName,
    getPatient, addPatient, modifyPatientByID, modifyPatientByName, deletePatientByID, deletePatientByName
}