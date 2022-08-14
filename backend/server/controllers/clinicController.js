// Handles the Clinic Object API calls to the Back End
const asyncHandler = require('express-async-handler')
const Clinic = require('../models/clinicModel')

// GET
const getClinic = asyncHandler(async(req, res) => {

    const clinicNameJSON = req.body.clinicName
    
    const clinic = await Clinic.find({clinicName: clinicNameJSON})

    if (!clinicName ) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    } 
    
    res.status(200).json(clinic)
})

// POST
const addClinic = asyncHandler(async(req, res) => {

    const clinicNameJSON = req.body.clinicName
    const clinicAddressJSON = req.body.clinicAddress
    const clinicContactNumberJSON = req.body.clinicContactNumber
    const clinicUrlJSON = req.body.clinicUrl

    const clinic = await Clinic.create({
        clinicName: clinicNameJSON,
        clinicAddress: clinicAddressJSON,
        clinicContactNumber: clinicContactNumberJSON,
        clinicUrl: clinicUrlJSON
    })

    if (!clinic) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    }

    res.status(200).json(clinic)
})

// PUT
const modifyClinic = asyncHandler(async(req, res) => {

    const clinic = await Clinic.findById(req.params.id)

    if (!clinic) {
        res.status(400)
        throw new Error(`Invalid Clinic Search for update!`)
    }

    const updatedClinic = await clinic.findById(
        req.params.id,
        req.body, {
            new: true,
        }
    )

    res.status(200).json(updatedClinic)

    /* Pre-DB Checks (Note may be broken atm)
    const clinicName = req.body.clinic_name;
    const clinicAddress = req.body.clinic_address;
    const clinicPhoneNumber = req.body.clinic_phone_number;

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

// DELETE
const deleteClinic = asyncHandler(async(req, res) => {

    const clinic = await Clinic.findById(req.params.id)

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

module.exports = {
    getClinic, addClinic, modifyClinic, deleteClinic
}