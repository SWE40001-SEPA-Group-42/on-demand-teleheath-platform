// Handles the Appointment Object API calls to the Back End
const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointment");

// GET
const searchForAppointment = asyncHandler(async (req, res) => {
  const ptEmail = req.query.ptEmail;
  const drEmail = req.query.drEmail;

  const appointment = await Appointment.find({
    ptEmail: ptEmail,
    drEmail: drEmail,
  });

  if (!appointment) {
    res.status(400);
    throw new Error(
      `Unable to find appointment between ${ptEmail} and ${drEmail}`
    );
  } else {
    res.status(200).json(appointment);
  }
});

// POST
const createAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.create({
    ptEmail: req.body.ptEmail,
    drEmail: req.body.drEmail,
    aptLink: req.body.aptLink,
  });

  if (!appointment) {
    res.status(400);
    throw new Error(
      `Invalid Appointment Details: Missing inputs found in the request!`
    );
  } else {
    res.status(200).json(appointment);
  }
});

// PUT
const updateAppointment = asyncHandler(async (req, res) => {
  const ptEmail = req.body.ptEmail;
  const drEmail = req.body.drEmail;

  const updatedAppointment = await Appointment.findOneAndUpdate(
    {
      ptEmail: ptEmail,
      drEmail: drEmail,
    },
    req.body,
    {
      new: true,
      context: "query",
    }
  );

  if (!updatedAppointment) {
    res.status(400);
    throw new Error(`Invalid Appointment search for update!`);
  } else {
    res.status(200).json(updatedAppointment);
  }
});

// DELETE
const deleteAppointment = asyncHandler(async (req, res) => {
  const ptEmail = req.query.ptEmail;
  const drEmail = req.query.drEmail;
  const appointment = await Appointment.findOneAndRemove({
    ptEmail: ptEmail,
    drEmail: drEmail,
  });

  if (!appointment) {
    res.status(400);
    throw new Error(`Invalid Clinic Search for update!`);
  } else {
    res.status(200).json(appointment);
  }
});

// PUT - Appointment using ID
const updateAppointmentByID = asyncHandler(async (req, res) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  if (!updatedAppointment) {
    res.status(400);
    throw new Error(`Invalid Appointment search for update!`);
  } else {
    res.status(200).json(updatedAppointment);
  }
});

// DELETE - Appointment using ID
const deleteAppointmentByID = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    res.status(400);
    throw new Error(`Invalid Appointment search for delete!`);
  } else {
    await appointment.remove();
    res.status(200).json(appointment);
  }
});

// Appointment Status calls
const checkForAppointmentStatus = asyncHandler(async (req, res) => {
  const aptStatus = req.query.aptStatus;

  const appointment = await Appointment.find({
    aptStatus: aptStatus,
  });

  if (!appointment) {
    res.status(400);
    throw new Error(`Unable to find appointment status`);
  } else {
    res.status(200).json(appointment);
  }
});

// Check if this is required [Minh]
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const ptEmail = req.body.ptEmail;
  const drEmail = req.body.drEmail;
  const aptLink = req.body.aptLink;
  const aptStatus = req.body.aptStatus;

  const updatedAppointment = await Appointment.findOneAndUpdate(
    {
      ptEmail: ptEmail,
      drEmail: drEmail,
    },
    {
      $set: {
        aptLink: aptLink,
        aptStatus: aptStatus,
      },
    },
    {
      new: true,
      context: "query",
    }
  );

  if (!updatedAppointment) {
    res.status(400);
    throw new Error(`Invalid Appointment search for update!`);
  } else {
    res.status(200).json(updatedAppointment);
  }
});

//GET 
const searchForAppointmentByDoctor = asyncHandler(async (req, res) => {
  const drEmail = req.query.drEmail;

  const appointment = await Appointment.find({
    drEmail: drEmail,
  });

  if (!appointment) {
    res.status(400);
    throw new Error(
      `Unable to find appointment between ${ptEmail} and ${drEmail}`
    );
  } else {
    res.status(200).json(appointment);
  }
})

module.exports = {
  searchForAppointment,
  checkForAppointmentStatus,
  updateAppointmentStatus,
  createAppointment,
  updateAppointment,
  updateAppointmentByID,
  deleteAppointment,
  deleteAppointmentByID,
  searchForAppointmentByDoctor
};
