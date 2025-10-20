const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// Add a new Trip
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    const savedTrip = await newTrip.save();
    return res.status(201).json(savedTrip);
  } catch (err) {
    console.error("Error adding trip:", err);
    return res.status(500).json({ message: "Failed to add trip", error: err });
  }
};

// List all Trips
const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({}).exec();
    return res.status(200).json(trips);
  } catch (err) {
    console.error("Error fetching trips:", err);
    return res.status(500).json({ message: "Failed to fetch trips", error: err });
  }
};

// Find trip by code
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Model.find({ code: req.params.tripCode }).exec();
    if (!trip || trip.length === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }
    return res.status(200).json(trip);
  } catch (err) {
    console.error("Error fetching trip by code:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// Update Trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const updatedTrip = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true } // Return the updated document
    ).exec();

    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(200).json(updatedTrip);
  } catch (err) {
    console.error("Error updating trip:", err);
    return res.status(500).json({ message: "Failed to update trip", error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};
