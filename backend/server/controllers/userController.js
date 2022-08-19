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

// PUT - Clinic
const modifyClinic = asyncHandler(async(req, res) => {

    //Pass in the object _id
    const filter =req.params.id

    //update: All the information from postman
    const update = {
        clinicAddress: req.body.clinicAddress,
        clinicContact: req.body.clinicContact,
        clinicName: req.body.clinicName,
        clinicUrl: req.body.clinicUrl
    }


    // const update = {
    //     clinicAddress: "156 High Road",
    //     clinicContact: "12345",
    //     clinicName: "Electra Park Medical Centre",
    //     clinicUrl: "Insert new links"
    // }


    //Function that find the result then update it with new data (entirely)
    const clinic = await  clinicModel.findOneAndUpdate(filter, update)
    if (!filter_id) {
        res.status(400)
        throw new Error(`Invalid Clinic Search for update!`)
    }
    res.status(200).json(clinic)


    //Could be discuss with the front end to outline what are
    //constraints for validating the inputs so it is in sync


    /* Pre-DB Checks (Note may be broken atm)
    const clinicName = req.body.clinic_name;
    const clinicAddress = req.body.clinic_address;
    const clinicPhoneNumber = req.body.clinic_phone_number; 

    //NJ - thinks doesnt need to because once the edit form is popped up 
    //NJ - all the info will be shown and we just need to cast into the new string
    //NJ - No pre-db check needed
    if (!clinicName || !clinicAddress || !clinicPhoneNumber ) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    }

    {
        updateJson: {
            "clinicName" : `${clinicName}`,
            "clinicAddress" : `${clinicAddress}`,
            "clinicPhoneNumber" : `${clinicPhoneNumber}`
        }
    }

    res.status(200).json({message: `Updating entire Clinic record for ${req.params.id}`})
    */
})

// DELETE - Clinic
const deleteClinic = asyncHandler(async(req, res) => {

    const clinic = await clinicModel.findById(req.params.id)

    if (!clinic) {
        res.status(400)
        throw new Error(`Invalid Clinic Search for update!`)
    }

    await clinic.remove()

    res.status(200).json({ id: req.params.id })

    /* Pre-DB Checks
    const clinicName = req.body.clinic_name;

    if (!clinicName ) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    }

    res.status(200).json({message:  `Deleting Clinic record for ${req.params.id} : ${clinicName}`})
    */

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

// PUT - Doctor
const modifyDoctor = asyncHandler(async(req, res) => {
    
    const doctor = await doctorModel.findById(req.params.id)

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for update!`)
    }

    const updatedDoctor = await doctor.findById(
        req.params.id,
        req.body, {
            new: true,
        }
    )

    res.status(200).json(updatedDoctor)

    /* Pre-DB Checks (Note may be broken atm)
    const doctorName: req.body.doctor_name,
    const doctorAge: req.body.doctor_age,
    const doctorClinic: req.body.doctor_clinic,
    const doctorQualification: req.body.doctor_quals,
    const doctorContactNumber: req.body.doctor_contact_num

    if (!doctorName || !doctorAge || !doctorClinic || !doctorQualification || !doctorContactNumber ) {
        res.status(400)
        throw new Error(`Invalid Doctor Details: Missing inputs found in the request!`)
    }

    {
        updateJson: {
            "doctorName" : `${doctorName}`,
            "doctorAge" : `${doctorAge}`,
            "doctorClinic" : `${doctorClinic}`
            "doctorQualification" : `${doctorQualification}`,
            "doctorContactNumber" : `${doctorContactNumber}`,
        }
    }

    res.status(200).json({message: `Updating entire Doctor record for ${req.params.id}`})
    */
})

// DELETE - Doctor
const deleteDoctor = asyncHandler(async(req, res) => {

    const doctor = await doctorModel.findById(req.params.id)

    if (!doctor) {
        res.status(400)
        throw new Error(`Invalid Doctor Search for update!`)
    }

    await doctor.remove()

    res.status(200).json({ id: req.params.id })

    /* Pre-DB Checks
    const doctorName = req.body.doctor_name;

    if (!doctorName ) {
        res.status(400)
        throw new Error(`Invalid Doctor Details: Missing inputs found in the request!`)
    }

    res.status(200).json({message:  `Deleting Doctor record for ${req.params.id} : ${doctorName}`})
    */

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
        ptEmail: req.body.ptEmail
    })

    if (!patient) {
        res.status(400)
        throw new Error(`Invalid Patient Details: Missing inputs found in the request!`)
    }

    res.status(200).json(patient)
})

// PUT - Patient
const modifyPatient = asyncHandler(async(req, res) => {
    
    const patient = await patientModel.findById(req.params.id)

    if (!patient) {
        res.status(400)
        throw new Error(`Invalid Patient Search for update!`)
    }

    const updatedPatient = await patient.findById(
        req.params.id,
        req.body, {
            new: true,
        }
    )

    res.status(200).json(updatedPatient)

    /* Pre-DB Checks (Note may be broken atm)
    const patientName = req.body.patient_name;
    const patientAge = req.body.patient_age;
    const patientAddress = req.body.patient_address;
    const patientPhoneNumber = req.body.patient_phone_number;

    if (!patientName || !patientAge || !patientAddress || !patientPhoneNumber ) {
        res.status(400)
        throw new Error(`Invalid Patient Details: Missing inputs found in the request!`)
    }

    {
        updateJson: {
            "patientName" : `${patientName}`,
            "patientAge" : `${patientAge}`
            "patientAddress" : `${patientAddress}`,
            "patientPhoneNumber" : `${patientPhoneNumber}`
        }
    }

    res.status(200).json({message: `Updating entire Patient record for ${req.params.id}`})
    */
})

// DELETE - Patient
const deletePatient = asyncHandler(async(req, res) => {

    const patient = await patientModel.findById(req.params.id)

    if (!patient) {
        res.status(400)
        throw new Error(`Invalid Patient Search for update!`)
    }

    await patient.remove()

    res.status(200).json({ id: req.params.id })

    /* Pre-DB Checks
    const patientName = req.body.patient_name;

    if (!patientName ) {
        res.status(400)
        throw new Error(`Invalid Patient Details: Missing inputs found in the request!`)
    }

    res.status(200).json({message:  `Deleting Patient record for ${req.params.id} : ${patientName}`})
    */

})


module.exports = {
    getClinic, addClinic, modifyClinic, deleteClinic,
    getDoctor, addDoctor, modifyDoctor, deleteDoctor,
    getPatient, addPatient, modifyPatient, deletePatient
}