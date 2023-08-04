// Importing mongoose library
const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Try to establish a connection with the MongoDB database
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    // If the connection is successful, log a success message
    console.log("DB connected successfully 🚀 ");
  } catch (error) {
    // If there is an error while trying to connect, log the error message
    console.log("Error while connecting to DB", " ", error);
  }
};

// Export the connectDB function
module.exports = connectDB;
