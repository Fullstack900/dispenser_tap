// Import the necessary modules
const express = require("express");
const router = express.Router(); // create a new Express Router

// Import the reports controller module
const reportsController = require("../controllers/reports");

// Define a GET route for "/dispenser" path,
// which will call the getReport function from the reportsController when a GET request is received
router.get("/dispenser", reportsController.getReport);

// Define a GET route for "/analytics/:id", where ":id" is a parameter representing the ID of a dispenser
// This route will call the getDispenserAnalytics function from the reportsController when a GET request is received
router.get("/analytics/:id", reportsController.getDispenserAnalytics);

// Export the router, so it can be used by other modules (e.g., when defining the application routes in the main server file)
module.exports = router;
