// Importing the necessary models and services
const { Dispenser } = require("../models/dispenser");
const dispenserHistoryService = require("./dispenserHistoryService");

// Function to create a new dispenser with the given data
exports.createDispenser = async (dispenserData) => {
  // Create a new dispenser with the given data
  const dispenser = new Dispenser(dispenserData);

  // Save the dispenser to the database
  await dispenser.save();

  // Return the newly created dispenser
  return dispenser;
};

// Function to open a dispenser
exports.openDispenser = async (id) => {
  // Retrieve the dispenser with the given ID
  const dispenser = await Dispenser.findById(id);

  // If the dispenser is not found, throw an error
  if (!dispenser) {
    throw new Error("Dispenser not found");
  }

  // If the dispenser is already open, throw an error
  if (dispenser.status === "open") {
    throw new Error("Dispenser is already open");
  }

  // If the current volume of the dispenser is almost empty (between 0 and 1), throw an error
  if (dispenser.currentVolume >= 0 && dispenser.currentVolume <= 1) {
    throw new Error("Dispenser is empty!");
  }

  // Set the dispenser's status to 'open' and the open time to the current time
  dispenser.status = "open";
  dispenser.openTime = new Date();

  // Save the dispenser to the database
  await dispenser.save();

  // Return the dispenser's status, open time, and remaining beer volume
  return {
    status: dispenser.status,
    openTime: dispenser.openTime,
    remainingBeer: dispenser.currentVolume + " " + "litr",
  };
};

// Function to close a dispenser
exports.closeDispenser = async (id) => {
  // Retrieve the dispenser with the given ID
  const dispenser = await Dispenser.findById(id);

  // If the dispenser is not found, throw an error
  if (!dispenser) {
    throw new Error("Dispenser not found");
  }

  // If the dispenser is not open, throw an error
  if (dispenser.status !== "open") {
    throw new Error("Dispenser is not open");
  }

  // Calculate the duration (in seconds) for which the dispenser was open
  const openDurationInSeconds = (new Date() - dispenser.openTime) / 1000;

  // Calculate the volume served (in litres) based on the dispenser's flow volume and open duration
  let volumeServed = openDurationInSeconds * dispenser.flow_volume;

  // Check if the dispenser has enough beer left to serve the calculated volume
  // If not, serve only the remaining beer and close the dispenser
  if (dispenser.currentVolume - volumeServed <= 1) {
    volumeServed = dispenser.currentVolume;
    dispenser.status = "closed";
    dispenser.currentVolume = 0;
  } else {
    // If there's enough beer left, subtract the served volume from the dispenser's current volume
    dispenser.currentVolume -= volumeServed;
  }

  // If the dispenser has served 3 litres or more in total, close it
  if (dispenser.totalServed + volumeServed >= 3) {
    dispenser.status = "closed";
  }

  // Update the total served volume, total revenue, total open time, and total uses of the dispenser
  dispenser.totalServed += volumeServed;
  dispenser.totalRevenue += volumeServed * dispenser.pricePerLiter;
  dispenser.totalOpenTime += openDurationInSeconds;
  dispenser.totalUses += 1;

  // Create a new dispenser history record
  await dispenserHistoryService.createDispenserHistory(dispenser);

  // Reset the dispenser's open time to null
  dispenser.openTime = null;

  // Save the dispenser to the database
  await dispenser.save();

  // Calculate the total cost of the beer served during this use
  let cost = volumeServed * dispenser.pricePerLiter;

  // Generate a message indicating how much beer was served and the current status of the dispenser
  let message = `Served ${volumeServed.toFixed(
    2
  )} litres of beer. Dispenser status: ${dispenser.status}`;
  if (dispenser.status === "closed") {
    message += ". The dispenser is now closed.";
  }

  // Return information about the dispenser's usage
  return {
    timeOpen: openDurationInSeconds,
    volumeServed: volumeServed,
    remainingBeer: dispenser.currentVolume,
    cost: cost,
    message: message,
  };
};

// Function to retrieve a dispenser
exports.getDispenser = async (id) => {
  // Retrieve the dispenser with the given ID
  const dispenser = await Dispenser.findById(id);

  // If the dispenser is not found, throw an error
  if (!dispenser) {
    throw new Error("Dispenser not found");
  }

  // Return the retrieved dispenser
  return dispenser;
};
