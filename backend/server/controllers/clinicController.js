// Handles the Clinic Object API calls to the Back End
const asyncHandler = require("express-async-handler");
const Clinic = require("../models/clinic");

const getClinic = asyncHandler(async (request, response) => {
  const clName = request.query.clName;
  const clinics = await Clinic.find({ clName: clName });

  if (!clinics) {
    response.status(400);
    throw new Error(
      `Invalid Clinic Details: Missing inputs found in the request!`
    );
  } else {
    response.status(200).json(clinics);
  }
});

const addClinic = asyncHandler(async (request, response, next) => {
  const clinic = await Clinic.create({
    clName: request.body.clName,
    clAddress: {
      line1: request.body.clAddress.line1,
      line2: request.body.clAddress.line2,
      city: request.body.clAddress.city,
      state: request.body.clAddress.state,
      postcode: request.body.clAddress.postcode,
      country: request.body.clAddress.country,
    },
    clPhone: request.body.clPhone,
    clEmailAddress: request.body.clEmailAddress,
  });

  if (!clinic) {
    response.status(400);
    throw new Error(
      `Invalid Clinic Details: Missing inputs found in the request!`
    );
  } else {
    response.status(200).json(clinic);
  }
});

const updateClinicByID = asyncHandler(async (request, response) => {
  const updatedClinic = await Clinic.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  if (!updatedClinic) {
    response.status(400);
    throw new Error(`Invalid Clinic Search for update!`);
  } else {
    response.status(200).json(updatedClinic);
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
