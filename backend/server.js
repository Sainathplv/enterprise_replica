const cors = require("cors");
const express = require("express");
const flightsRouter = require("./routes/flights");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from frontend
app.use(express.json());

// Routes
app.use("/api/flights", flightsRouter);

// Server listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
