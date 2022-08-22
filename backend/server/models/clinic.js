const mongoose = require('mongoose')

// Model refers to Schema collection `clinic` and passes it based on these requirements
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
            type: String,
            required: [true, 'Please add a clinic contact number']
        },
        clinicUrl: {
            type: String,
            required: [true, 'Please add a clinic url']
        }
    },
    {
        collection: 'clinics',
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model('clinics', clinicSchema)