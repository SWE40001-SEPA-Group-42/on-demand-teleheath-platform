const mongoose = require("mongoose");

// Model refers to Schema collection `appointments` and passes it based on these requirements
const appointmentSchema = mongoose.Schema(
  {
    dateOfAppointment: {
      type: Date,
      default: Date.now(),
      required: [true, "No date found to add"],
    },
    ptEmail: {
      type: String,
      required: [true, "No patient email found"],
    },
    drEmail: {
      type: String,
      required: [true, "No doctor email found"],
    },
    aptLink: {
      type: String,
      required: [true, "Please provide an appointment link"],
    },
  },
  {
    collection: "appointments",
    versionKey: false,
    timestamps: {
      createdAt: "aptCreatedAt",
      updatedAt: "aptLastUpdatedAt",
    },
  }
);

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;
