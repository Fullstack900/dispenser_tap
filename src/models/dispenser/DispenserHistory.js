// Importing mongoose
const mongoose = require("mongoose");

// Defining the dispenser history schema
const dispenserHistorySchema = new mongoose.Schema({
  // The dispenser associated with this history record
  // This is a reference to a Dispenser model
  dispenser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dispenser",
  },
  // The date and time when the dispenser was opened
  openedAt: {
    type: Date,
  },
  // The date and time when the dispenser was closed
  closedAt: {
    type: Date,
  },
  // The volume of beer that was served during this usage of the dispenser
  served: {
    type: Number,
  },
  // The revenue generated from the beer served during this usage of the dispenser
  revenue: {
    type: Number,
  },
});

// Creating the DispenserHistory model from the dispenserHistory schema
const DispenserHistory = mongoose.model(
  "DispenserHistory",
  dispenserHistorySchema
);

// Exporting the DispenserHistory model
module.exports = DispenserHistory;
