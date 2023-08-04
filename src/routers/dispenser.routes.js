// Import the necessary modules
const express = require("express");
const router = express.Router(); // create a new Express Router

// Import the dispenser controller module
const dispenserController = require("../controllers/dispenser");

// Define a POST route at the root ("/") path,
// which will call the createDispenser function from the dispenserController when a POST request is received
router.post("/", dispenserController.createDispenser);

// Define a PATCH route for "/:id/open", where ":id" is a parameter representing the ID of a dispenser
// This route will call the openDispenser function when a PATCH request is received
router.patch("/:id/open", dispenserController.openDispenser);

// Define a PATCH route for "/:id/close", where ":id" is a parameter representing the ID of a dispenser
// This route will call the closeDispenser function when a PATCH request is received
router.patch("/:id/close", dispenserController.closeDispenser);

// Define a GET route for "/:id", where ":id" is a parameter representing the ID of a dispenser
// This route will call the getDispenser function when a GET request is received
router.get("/:id", dispenserController.getDispenser);

// Export the router, so it can be used by other modules (e.g., when defining the application routes in the main server file)
module.exports = router;
