// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const app = express();
const cors = require("cors");

// Get the port from the environment variables
const port = process.env.PORT;

// Import the DB configuration module
const connectDB = require("./config");

// Import the main routes module
const routes = require("./routers/routes");

// Use JSON middleware for parsing JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Define a middleware function to enable CORS manually, if needed
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow requests from any origin
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,Patch,DELETE,OPTIONS"
  ); // allow these methods
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With" // allow these headers
  );

  // if it's just an OPTIONS request (a preflight request), send a successful status code
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    // if it's not an OPTIONS request, move on to the next middleware or route handler
    next();
  }
};

// Use the CORS middleware
app.use(allowCrossDomain);

// Use the main router
app.use("/", routes);

// Connect to the DB
connectDB();

// Define the root route
app.get("/", (req, res) => {
  res.send("Beer tap dispensers app");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port} 🔥`);
});
