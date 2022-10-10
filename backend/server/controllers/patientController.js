// Handles the Patient Object API calls to the Back End
const e = require("express");
const asyncHandler = require("express-async-handler");
const Patient = require("../models/patient");

// GET - Patient
const getPatient = asyncHandler(async (req, res) => {
  const ptGivenName = req.body.ptGivenName;
  const ptSurname = req.body.ptSurname;

  const patient = await Patient.find({
    ptGivenName: ptGivenName,
    ptLastName: ptSurname,
  });

  if (!patient) {
    res.status(400);
    throw new Error(
      `Invalid Patient Details: Missing inputs found in the request!`
    );
  } else {
    res.status(200).json(patient);
  }
});

// POST - Patient
const addPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.create({
    ptGivenName: req.body.ptGivenName,
    ptSurname: req.body.ptSurname,
    ptPreferredName: req.body.ptPreferredName,
    ptDOB: req.body.ptDOB,
    ptBirthSex: req.body.ptBirthSex,
    ptEmailAddress: req.body.ptEmailAddress,
    ptMobilePhone: req.body.ptMobilePhone,
    ptHomePhone: req.body.ptHomePhone,
    ptWorkPhone: req.body.ptWorkPhone,
    ptAddress: {
      line1: req.body.ptAddress.line1,
      line2: req.body.ptAddress.line2,
      city: req.body.ptAddress.city,
      state: req.body.ptAddress.state,
      postcode: req.body.ptAddress.postcode,
      country: req.body.ptAddress.country,
    },
    ptMedicareCardNo: req.body.ptMedicareCardNo,
    ptMedicareCardIRN: req.body.ptMedicareCardIRN,
    ptMedicareCardExpiryDate: req.body.ptMedicareCardExpiryDate,
    ptPrivateHealthFund: req.body.ptPrivateHealthFund,
    ptPrivateHealthFundNo: req.body.ptPrivateHealthFundNo,
    ptEmgContactGivenName: req.body.ptEmgContactGivenName,
    ptEmgContactSurname: req.body.ptEmgContactSurname,
    ptEmgContactRelationship: req.body.ptEmgContactRelationship,
    ptEmgContactMobilePhone: req.body.ptEmgContactMobilePhone,
    ptEmgContactHomePhone: req.body.ptEmgContactHomePhone,
    ptEmgContactWorkPhone: req.body.ptEmgContactWorkPhone,
    ptNextOfKinGivenName: req.body.ptNextOfKinGivenName,
    ptNextOfKinSurname: req.body.ptNextOfKinSurname,
    ptNextOfKinRelationship: req.body.ptNextOfKinRelationship,
    ptNextOfKinMobilePhone: req.body.ptNextOfKinMobilePhone,
    ptNextOfKinHomePhone: req.body.ptNextOfKinHomePhone,
    ptNextofKinWorkPhone: req.body.ptNextofKinWorkPhone,
    ptDVAFileNo: req.body.ptDVAFileNo,
    ptDVAExpiryDate: req.body.ptDVAExpiryDate,
    ptHealthcareCardNo: req.body.ptHealthcareCardNo,
    ptHealthcareCardExpiryDate: req.body.ptHealthcareCardExpiryDate,
    ptPensionCardNo: req.body.ptPensionCardNo,
    ptPensionCardExpiryDate: req.body.ptPensionCardExpiryDate,
  });

  if (!patient) {
    res.status(400);
    throw new Error(
      `Invalid Patient Details: Missing inputs found in the request!`
    );
  } else {
    res.status(200).json(patient);
  }
});

// PUT - Patient using ID
const modifyPatientByID = asyncHandler(async (req, res) => {
  const updatedPatient = await Patient.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  if (!updatedPatient) {
    res.status(400);
    throw new Error(`Invalid Patient Search for update!`);
  } else {
    res.status(200).json(updatedPatient);
  }
});

// PUT - Patient using Name
const modifyPatientByName = asyncHandler(async (req, res) => {
  const ptGivenName = req.body.ptGivenName;
  const ptSurname = req.body.ptSurname;

  const updatedPatient = await Patient.findOneAndUpdate(
    {
      ptGivenName: ptGivenName,
      ptSurname: ptSurname,
    },
    req.body,
    {
      new: true,
    }
  );

  if (!updatedPatient) {
    res.status(400);
    throw new Error(`Invalid Patient Search for update!`);
  } else {
    res.status(200).json(updatedPatient);
  }
});

// DELETE - Patient using ID
const deletePatientByID = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(400);
    throw new Error(`Invalid Patient Search for delete!`);
  } else {
    await patient.remove();
    res.status(200).json(patient);
  }
});

// DELETE - Patient using Name
const deletePatientByName = asyncHandler(async (req, res) => {
  const ptGivenName = req.body.ptGivenName;
  const ptSurname = req.body.ptSurname;

  const patient = await Patient.findOneAndRemove({
    ptGivenName: ptGivenName,
    ptSurname: ptSurname,
  });

  if (!patient) {
    res.status(400);
    throw new Error(`Invalid Patient Search for delete!`);
  } else {
    res.status(200).json(patient);
  }
});

module.exports = {
  getPatient,
  addPatient,
  modifyPatientByID,
  modifyPatientByName,
  deletePatientByID,
  deletePatientByName,
};
