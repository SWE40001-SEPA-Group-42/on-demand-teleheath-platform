const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
    _id: false,
  }
);

// Model refers to Schema collection `clinic` and passes it based on these requirements
const clinicSchema = mongoose.Schema(
  {
    clName: {
      type: String,
      unique: true,
      required: [true, "Please add a clinic name"],
    },
    clAddress: {
      type: addressSchema,
      required: [true, "Please add a clinic address"],
    },
    clPhone: {
      type: String,
      required: [true, "Please add a clinic contact number"],
    },
    clEmailAddress: {
      type: String,
      required: [true, "Please add a clinic's email address"],
    },
  },
  {
    collection: "clinics",
    versionKey: false,
    timestamps: {
      createdAt: "clCreatedAt",
      updatedAt: "clLastUpdatedAt",
    },
  }
);

// Unique Validator
// clinicSchema.plugin(uniqueValidator);

const Clinic = mongoose.model("clinics", clinicSchema);

module.exports = Clinic;
