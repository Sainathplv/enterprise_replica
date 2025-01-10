const express = require("express");
const { forgotPassword } = require("../controllers/forgotPasswordController");

const router = express.Router();

// Route for forgot password
router.post("/", forgotPassword);

module.exports = router;