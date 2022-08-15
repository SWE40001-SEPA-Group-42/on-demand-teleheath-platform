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

// Model refers to Schema collection `doctors` and passes it based on these requirements
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
clinicModel = mongoose.model('clinics', clinicSchema)

module.exports = { clinicModel, doctorModel, patientModel}