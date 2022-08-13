// Handles the Clinic Object API calls to the Back End
const asyncHandler = require('express-async-handler')
const Clinic = require('../models/clinicModel')

// GET
const getClinic = asyncHandler(async(req, res) => {

    const clinic = await Clinic.find()

    if (!clinic ) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    }

    res.status(200).json(clinic)

    /* Pre DB Checks
    const clinicName = req.body.clinic_name;

    if (!clinicName ) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    }

    res.status(200).json({message: `Searching for Clinic record for ${clinicName}`})
    */
})

// POST
const addClinic = asyncHandler(async(req, res) => {
    const clinic = await Clinic.create({
        clinicName: req.body.clinic_name,
        clinicAddress: req.body.clinic_address,
        clinicContactNumber: req.body.clinic_phone_number
    })

    if (!clinic) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    }

    res.status(200).json(clinic)

    /* Pre-DB Checks
    const clinicName = req.body.clinic_name;
    const clinicAddress = req.body.clinic_address;
    const clinicPhoneNumber = req.body.clinic_phone_number;

    if (!clinicName || !clinicAddress || !clinicPhoneNumber ) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    }

    res.status(200).json({message: `Creating Clinic record for ${clinicName}`})
    */
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