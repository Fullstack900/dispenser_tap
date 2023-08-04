// Importing the necessary services
const dispenserService = require("../../services/dispenserService");

// Controller function to create a new dispenser
exports.createDispenser = async (req, res) => {
  try {
    // Call the createDispenser service function with the request body data
    const dispenser = await dispenserService.createDispenser(req.body);

    // If successful, return the created dispenser with a 201 (Created) status
    res.status(201).json(dispenser);
  } catch (error) {
    // If an error occurs, return the error message with a 400 (Bad Request) status
    res.status(400).json({ message: error.message });
  }
};

// Controller function to open a dispenser
exports.openDispenser = async (req, res) => {
  try {
    // Call the openDispenser service function with the ID from the request parameters
    const dispenser = await dispenserService.openDispenser(req.params.id);

    // If successful, return the opened dispenser
    res.json(dispenser);
  } catch (error) {
    // If an error occurs, return the error message with a 500 (Internal Server Error) status
    res.status(500).json({ message: error.message });
  }
};

// Controller function to close a dispenser
exports.closeDispenser = async (req, res) => {
  try {
    // Call the closeDispenser service function with the ID from the request parameters
    const dispenser = await dispenserService.closeDispenser(req.params.id);

    // If successful, return the closed dispenser
    res.json(dispenser);
  } catch (error) {
    // If an error occurs, return the error message with a 500 (Internal Server Error) status
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a dispenser
exports.getDispenser = async (req, res) => {
  try {
    // Call the getDispenser service function with the ID from the request parameters
    const dispenser = await dispenserService.getDispenser(req.params.id);

    // If successful, return the retrieved dispenser
    res.json(dispenser);
  } catch (error) {
    // If an error occurs, return the error message with a 500 (Internal Server Error) status
    res.status(500).json({ message: error.message });
  }
};
