const cors = require("cors");
const express = require("express");
const flightsRouter = require("./routes/flights");
const userRoutes = require("./routes/userRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const hotelsRouter  = require("./routes/hotels")
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from frontend
app.use(express.json());

// Routes
app.use("/api/flights", flightsRouter);
app.use("/api/users", userRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/hotels", hotelsRouter)

// Register Test Route (for quick testing, can be removed later)
app.post("/api/users/register", (req, res) => {
  res.status(200).json({ message: "Test: Registration endpoint is working." });
});

// 404 Handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});


// Server listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
