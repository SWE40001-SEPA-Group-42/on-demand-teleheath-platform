const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    line1: {
      type: String,
      required: [true, "Please add an address"],
    },
    line2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: [true, "Please add a city"],
    },
    state: {
      type: String,
      required: [true, "Please add a state"],
    },
    postcode: {
      type: String,
      required: [true, "Please add a postcode"],
    },
    country: {
      type: String,
      required: [true, "Please add country"],
    },
  },
  {
    _id: false
  }
);

// Model refers to Schema collection `patients` and passes it based on these requirements
const patientSchema = mongoose.Schema(
  {
    ptGivenName: {
      type: String,
      required: [true, "Please add a patient given name"],
    },
    ptSurname: {
      type: String,
      required: [true, "Please add a patient surname"],
    },
    ptPreferredName: {
      type: String,
      required: [true, "Please add a patient preffered name"],
    },
    ptDOB: {
      type: Date,
      required: [true, "Please add a patient's DOB"],
    },
    ptBirthSex: {
      type: String,
      required: [true, "Please add a patient's gender"],
    },
    ptEmailAddress: {
      type: String,
      required: [true, "Please add a patient's email address "],
    },
    ptMobilePhone: {
      type: String,
      required: [true, "Please add a patient's contact number"],
    },
    ptHomePhone: {
      type: String,
      required: false,
    },
    ptWorkPhone: {
      type: String,
      required: false,
    },
    ptAddress: {
      type: addressSchema,
      required: [true, "Please add a patient's address"],
    },
    ptMedicareCardNo: {
      type: String,
      required: [true, "Please add a valid Medicare card number"],
    },
    ptMedicareCardIRN: {
      type: Number,
      required: false,
    },
    ptMedicareCardExpiryDate: {
      type: String,
      required: false,
    },
    ptPrivateHealthFund: {
      type: String,
      required: false,
    },
    ptPrivateHealthFundNo: {
      type: String,
      required: false,
    },
    ptEmgContactGivenName: {
      type: String,
      required: false,
    },
    ptEmgContactSurname: {
      type: String,
      required: false,
    },
    ptEmgContactRelationship: {
      type: String,
      required: false,
    },
    ptEmgContactMobilePhone: {
      type: String,
      required: false,
    },
    ptEmgContactHomePhone: {
      type: String,
      required: false,
    },
    ptEmgContactWorkPhone: {
      type: String,
      required: false,
    },
    ptNextOfKinGivenName: {
      type: String,
      required: false,
    },
    ptNextOfKinSurname: {
      type: String,
      required: false,
    },
    ptNextOfKinRelationship: {
      type: String,
      required: false,
    },
    ptNextOfKinMobilePhone: {
      type: String,
      required: false,
    },
    ptNextOfKinHomePhone: {
      type: String,
      required: false,
    },
    ptNextofKinWorkPhone: {
      type: String,
      required: false,
    },
    ptDVAFileNo: {
      type: String,
      required: false,
    },
    ptDVAExpiryDate: {
      type: Date,
      required: false,
    },
    ptHealthcareCardNo: {
      type: String,
      required: false,
    },
    ptHealthcareCardExpiryDate: {
      type: Date,
      required: false,
    },
    ptPensionCardNo: {
      type: String,
      required: false,
    },
    ptPensionCardExpiryDate: {
      type: Date,
      required: false,
    },
  },
  {
    collection: "patients",
    versionKey: false,
    timestamps: {
      createdAt: "ptJoinedAt",
      updatedAt: "ptLastUpdatedAt",
    },
  }
);

const Patient = mongoose.model("patients", patientSchema);

module.exports = Patient;
