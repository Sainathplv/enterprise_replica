const express = require("express");
const { getFlights } = require("../controllers/flightsController");
const router = express.Router();

// Route to handle flight search
router.get("/", getFlights);

module.exports = router;
