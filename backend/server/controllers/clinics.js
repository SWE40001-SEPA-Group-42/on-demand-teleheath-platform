const Clinic = require('../models/clinic')
const clinicRouter = require('express').Router()
const asyncHandler = require('express-async-handler')
const clinicModel = require("../models/clinic");

clinicRouter.get('/', async (request, response) => {
    const cName = request.body.clinicName
    const clinics = await Clinic.find({clinicName : cName})

    if (!cName) {
        response.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    }

    response.status(200).json(clinics)

})

clinicRouter.post('/', async (request, response, next) => {
    const clinic = await clinicModel.create({
        clinicName: request.body.clinicName,
        clinicAddress: request.body.clinicAddress,
        clinicContactNumber: request.body.clinicContactNumber,
        clinicUrl: request.body.clinicUrl
    })

    if (!clinic) {
        response.status(400)
        throw new Error(`Invalid Clinic Details: Missing inputs found in the request!`)
    }

    response.status(200).json(clinic)
})

clinicRouter.put('/:id', async(request, response) => {
    const updatedClinic = await clinicModel.findByIdAndUpdate(
        request.params.id,
        request.body, {
            new: true,
        }
    )

    if (!updatedClinic) {
        response.status(400)
        throw new Error(`Invalid Clinic Search for update!`)
    }

    response.status(200).json(updatedClinic)
})


module.exports = clinicRouter
