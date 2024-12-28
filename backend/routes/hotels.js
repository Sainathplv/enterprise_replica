const express = require("express");
const { getFlights } = require("../controllers/hotelsController");
const router = express.Router();

// Route to handle flight search
router.get("/", getHotels);

module.exports = router;
