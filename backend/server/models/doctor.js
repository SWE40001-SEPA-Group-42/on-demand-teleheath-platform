const mongoose = require('mongoose')

// Model refers to Schema collection `clinic` and passes it based on these requirements
const doctorSchema = mongoose.Schema(
    {
        drFirstName: {
            type: String,
            required: [true, 'Please add a doctor\'s first name']
        },
        drSurName: {
            type: String,
            required: [true, 'Please add a doctor\'s last name']
        },
        drCode: {
            type: String,
            required: [true, 'Please add a doctor\'s code']
        },
        prescriberCode: {
            type: String,
            required: [true, 'Please add a doctor\'s prescriber code']
        },
        drAddress: {
            type: String,
            required: [true, 'Please add a doctor\'s address']
        },
        drPhoneNo: {
            type: String,
            required: [true, 'Please add a doctor\'s contact number']
        },
        drEmail:  {
            type: String,
            required: [true, 'Please add a doctor\'s email']
        },
        drClinic: {
            type: String,
            required: [true, 'Please add a doctor\'s clinic']
        },
        drQualif : {
            type: String,
            required: [true, 'Please add a doctor\'s qualification']
        }
    },
    {
        collection: 'doctors',
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model('doctors', doctorSchema)
