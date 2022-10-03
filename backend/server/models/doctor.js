const mongoose = require("mongoose");

// Model refers to Schema collection `clinic` and passes it based on these requirements
const doctorSchema = mongoose.Schema(
  {
    drGivenName: {
      type: String,
      required: [true, "Please add a doctor's given name"],
    },
    drSurname: {
      type: String,
      required: [true, "Please add a doctor's surname"],
    },
    drPreferredName: {
      type: String,
      required: [true, "Please add a doctor's preffered name"],
    },
    drDOB: {
      type: Date,
      required: [true, "Please add a doctor's DOB"],
    },
    drBirthSex: {
      type: String,
      required: [true, "Please add a doctors's gender"],
    },
    drEmail: {
      type: String,
      required: [true, "Please add a doctor's email"],
    },
    drPhone: {
      type: String,
      required: [true, "Please add a doctor's contact number"],
    },
    drAddress: {
      type: String,
      required: [true, "Please add a doctor's address"],
    },
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
    drCode: {
      type: String,
      required: [true, "Please add a doctor's code"],
    },
    drPrescriberNo: {
      type: String,
      required: [true, "Please add a doctor's prescriber code"],
    },
    drQualifications: {
      type: String,
      required: [true, "Please add a doctor's qualification"],
    },
    drLanguagesSpoken: {
      type: String,
      required: [true, "Please specify a doctor's spoken languages"],
    },
    drClinicName: {
      type: String,
      required: [true, "Please add a doctor's clinic"],
    },
    drAvail: {
      type: Boolean,
      default: true,
      required: [true, "Please add a doctor's availability"],
    },
  },
  {
    collection: "doctors",
    versionKey: false,
    timestamps: {
      createdAt: "drCreatedAt",
      updatedAt: "drLastUpdatedAt",
    },
  }
);

const Doctor = mongoose.model("doctors", doctorSchema);

module.exports = Doctor;
