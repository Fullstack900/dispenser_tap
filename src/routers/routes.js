// Import necessary modules
const express = require("express");
const router = express.Router(); // Create a new Express Router

// Import the dispenser and report route modules
const dispenserRoutes = require("./dispenser.routes");
const reportRoutes = require("./report.routes");

// Add the dispenser routes to the router, they will be added under the "/dispenser" path
router.use("/dispenser", dispenserRoutes);

// Add the report routes to the router, they will be added under the "/report" path
router.use("/report", reportRoutes);

// Export the router, so it can be used by other modules (e.g., when defining the application routes in the main server file)
module.exports = router;
