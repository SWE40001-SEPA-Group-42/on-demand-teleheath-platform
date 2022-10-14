// Handles the Clinic Object API calls to the Back End
const asyncHandler = require("express-async-handler");
const Clinic = require("../models/clinic");

const getClinic = asyncHandler(async (req, res) => {
  const clName = req.body.clName;
  const clinics = await Clinic.find({ clName: clName });

  if (!clinics) {
    res.status(400);
    throw new Error(
      `Invalid Clinic Details: Missing inputs found in the request!`
    );
  } else {
    res.status(200).json(clinics);
  }
});

const addClinic = asyncHandler(async (req, res, next) => {
  const clinic = await Clinic.create({
    clName: req.body.clName,
    clAddress: {
      line1: req.body.clAddress.line1,
      line2: req.body.clAddress.line2,
      city: req.body.clAddress.city,
      state: req.body.clAddress.state,
      postcode: req.body.clAddress.postcode,
      country: req.body.clAddress.country,
    },
    clPhone: req.body.clPhone,
    clEmailAddress: req.body.clEmailAddress,
  });

  if (!clinic) {
    res.status(400);
    throw new Error(
      `Invalid Clinic Details: Missing inputs found in the request!`
    );
  } else {
    res.status(200).json(clinic);
  }
});

const updateClinicByID = asyncHandler(async (req, res) => {
  const updatedClinic = await Clinic.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  if (!updatedClinic) {
    res.status(400);
    throw new Error(`Invalid Clinic Search for update!`);
  } else {
    res.status(200).json(updatedClinic);
  }
});

// PUT - Clinic using Name
const updateClinicByName = asyncHandler(async (req, res) => {
  const clName = req.body.clName;

  const updatedClinic = await Clinic.findOneAndUpdate(
    {
      clName: clName,
    },
    req.body,
    {
      new: true,
    }
  );

  if (!updatedClinic) {
    res.status(400);
    throw new Error(`Invalid Clinic Search for update!`);
  } else {
    res.status(200).json(updatedClinic);
  }
});

const deleteClinicByID = asyncHandler(async (req, res) => {
  const clinic = await Clinic.findById(req.params.id);
  if (!clinic) {
    res.status(400);
    throw new Error(`Invalid Clinic search for delete!`);
  } else {
    await clinic.remove();
    res.status(200).json(clinic);
  }
});

// DELETE - Clinic using name
const deleteClinicByName = asyncHandler(async (req, res) => {
  const clName = req.body.clName;
  const clinic = await Clinic.findOneAndRemove({ clName: clName });

  if (!clinic) {
    res.status(400);
    throw new Error(`Invalid Clinic Search for update!`);
  } else {
    res.status(200).json(clinic);
  }
});

module.exports = {
  getClinic,
  addClinic,
  updateClinicByID,
  updateClinicByName,
  deleteClinicByID,
  deleteClinicByName,
};
