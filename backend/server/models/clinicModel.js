const mongoose = require('mongoose')

const clinicSchema = mongoose.Schema(
    {
        clinicName: {
            type: String,
            required: [true, 'Please add a clinic name']
        },
        clinicAddress: {
            type: String,
            required: [true, 'Please add a clinic address']
        },
        clinicContactNumber: {
            type: Number,
            required: [true, 'Please add a clinic contact number']
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Clinic', clinicSchema)