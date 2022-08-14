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
        collection: 'clinic',
        versionKey: false,
        timestamps: true
    }
)

// Model refers to Schema collection `doctors` and passes it based on these requirements
const doctorSchema = mongoose.Schema(
    {
        doctorName: {
            type: String,
            required: [true, 'Please add a doctor name']
        },
        doctorAge: {
            type: String,
            required: [true, 'Please add a doctor\'s age']
        },
        doctorClinic: {
            type: String,
            required: [true, 'Please add a doctor clinic']
        },
        doctorQualification: {
            type: String,
            required: [true, 'Please add a doctor qualification']
        },
        doctorContactNumber: {
            type: String,
            required: [true, 'Please add a doctor qualification']
        }
    }, 
    {
        collection: 'doctors',
        versionKey: false,
        timestamps: true
    }
)

// Model refers to Schema collection `patients` and passes it based on these requirements
const patientSchema = mongoose.Schema(
    {
        patientName: {
            type: String,
            required: [true, 'Please add a patient name']
        },
        patientAge: {
            type: String,
            required: [true, 'Please add a patient\'s age']
        },
        patientAddress: {
            type: String,
            required: [true, 'Please add a patient qualification']
        },
        patientContactNumber: {
            type: String,
            required: [true, 'Please add a patient qualification']
        }
    }, 
    {
        collection: 'patients',
        versionKey: false,
        timestamps: true
    }
)


patientModel = mongoose.model('patients', patientSchema)
doctorModel = mongoose.model('doctors', doctorSchema)
clinicModel = mongoose.model('clinic', clinicSchema)

module.exports = { clinicModel, doctorModel, patientModel}