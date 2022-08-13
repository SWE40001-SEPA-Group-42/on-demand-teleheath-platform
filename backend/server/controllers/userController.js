// Handles the Clinic Object API calls to the Back End
const asyncHandler = require('express-async-handler')

// GET
const getClinic = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Searching for Clinic record'})
})

// POST
const addClinic = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error(`Invalid Clinic Details: No Input!`)
    }

    res.status(200).json({message: 'Creating Clinic record'})
})

// PUT
const modifyClinic = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Updating entire Clinic record for ${req.params.id}`})
})

// PATCH
const modifyClinicProps = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Updating ${req.params.fieldToUpdate} for Clinic record: ${req.params.id}` })
})

// DELETE
const deleteClinic = asyncHandler(async(req, res) => {
    res.status(200).json({message:  `Deleting Clinic record for ${req.params.id}`})
})

module.exports = {
    getClinic, addClinic, modifyClinic, modifyClinicProps, deleteClinic
}