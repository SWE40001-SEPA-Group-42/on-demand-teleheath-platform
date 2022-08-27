const mongoose = require('mongoose')

// Model refers to Schema collection `patients` and passes it based on these requirements
const patientSchema = mongoose.Schema(
    {
        ptFirstName: {
            type: String,
            required: [true, 'Please add a patient first name']
        },
        ptLastName: {
            type: String,
            required: [true, 'Please add a patient last name']
        },
        ptDOB: {
            type: String,
            required: [true, 'Please add a patient\'s DOB']
        },
        ptGender: {
            type: String,
            required: [true, 'Please add a patient\'s gender']
        },
        ptAddress: {
            type: String,
            required: [true, 'Please add a patient qualification']
        },
        ptReference: {
            type: String,
            required: [true, 'Please add a patient\'s referring doctor']
        },
        ptPhoneNo: {
            type: String,
            required: [true, 'Please add a patient contact number']
        },
        ptEmail: {
            type: String,
            required: [true, 'Please add a patient email']
        },
        ptMedicareID: {
            type: Number,
            required: [true, 'Please add a valid Medicare card number']

        }
    },
    {
        collection: 'patients',
        versionKey: false,
        timestamps: true
    }
)


patientModel = mongoose.model('patients', patientSchema)

module.exports = patientModel