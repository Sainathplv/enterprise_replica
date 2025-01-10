const express = require("express");
const { getHotels } = require("../controllers/hotelsController");
const router = express.Router();

// Route to handle flight search
router.get("/", getHotels);

module.exports = router;
