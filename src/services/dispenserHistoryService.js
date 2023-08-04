// Importing necessary models
const { DispenserHistory, Dispenser } = require("../models/dispenser");

// Function to create a new history record for a dispenser
exports.createDispenserHistory = async ({
  _id,
  openTime,
  flow_volume,
  pricePerLiter,
}) => {
  // Calculate the volume served based on the time the dispenser was open and the flow volume
  const volumeServed = ((new Date() - openTime) / 1000) * flow_volume;

  // Create a new history object
  const history = new DispenserHistory({
    dispenser: _id,
    openedAt: openTime,
    closedAt: new Date(),
    served: volumeServed,
    revenue: volumeServed * pricePerLiter,
  });

  // Save the history object in the database
  await history.save();

  // Return the newly created history object
  return history;
};

// Function to get the report between the given start and end time
exports.getReport = async (startTime, endTime) => {
  // If start time or end time is not provided, throw an error
  if (!startTime || !endTime) {
    throw new Error("startTime and endTime are required");
  }

  // Convert startTime and endTime to Date objects
  startTime = new Date(startTime);
  endTime = new Date(endTime);

  // If startTime or endTime is not a valid date, throw an error
  if (isNaN(startTime) || isNaN(endTime)) {
    throw new Error("Invalid date format");
  }

  // If start time is after end time, throw an error
  if (startTime > endTime) {
    throw new Error("startTime cannot be later than endTime");
  }

  try {
    // Fetch all histories between start and end time
    const histories = await DispenserHistory.find({
      openedAt: { $gte: startTime },
      closedAt: { $lte: endTime },
    });

    // Calculate total served and total revenue
    const totalServed = histories.reduce(
      (sum, history) => sum + history.served,
      0
    );
    const totalRevenue = histories.reduce(
      (sum, history) => sum + history.revenue,
      0
    );

    // Prepare detailed result for each history
    const result = histories.map((history) => ({
      dispenserId: history.dispenser,
      totalServed: history.served,
      totalRevenue: history.revenue,
    }));

    // Return total served, total revenue, and the detailed result
    return {
      totalServed,
      totalRevenue,
      details: result,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to get analytics for a particular dispenser
exports.getDispenserAnalytics = async (id) => {
  // Find the dispenser by id
  const dispenser = await Dispenser.findById(id);

  // If dispenser is not found, throw an error
  if (!dispenser) {
    throw new Error("Dispenser not found");
  }

  // Return analytics data
  return {
    totalOpenTime: dispenser.totalOpenTime,
    totalUses: dispenser.totalUses,
    totalServed: dispenser.totalServed,
    totalRevenue: dispenser.totalRevenue,
    remainingBeer: dispenser.currentVolume,
  };
};
