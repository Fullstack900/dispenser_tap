// Importing the necessary service
const dispenserHistoryService = require("../../services/dispenserHistoryService");

// Function to handle the GET request to fetch a report
exports.getReport = async (req, res) => {
  try {
    // Extracting startTime and endTime from the request query parameters
    const { startTime, endTime } = req.query;

    // Fetching the report from the service
    const report = await dispenserHistoryService.getReport(startTime, endTime);

    // Sending the fetched report as a response
    res.json(report);
  } catch (error) {
    // If any error occurred while fetching the report, send the error message as a response with a status code of 400
    res.status(400).json({ message: error.message });
  }
};

// Function to handle the GET request to fetch dispenser analytics
exports.getDispenserAnalytics = async (req, res) => {
  try {
    // Fetching the dispenser analytics using the service
    const analytics = await dispenserHistoryService.getDispenserAnalytics(
      req.params.id
    );

    // Sending the fetched analytics data as a response
    res.send(analytics);
  } catch (error) {
    // If any error occurred while fetching the analytics data, send an empty response with a status code of 500
    res.status(500).send();
  }
};
