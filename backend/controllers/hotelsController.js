const axios = require("axios");

// Controller function to fetch flight data
const getHotels = async (req, res) => {
  try {
    const { location, check_in_date, check_out_date, guests } = req.query;

    // Validate required fields
    if (!location || !check_in_date || !check_out_date) {
      return res.status(400).json({ error: "Missing required fields: 'location', 'check in date', check out date'" });
    }

    // Construct API request
    const apiUrl = "https://serpapi.com/search.json"; // Updated to the correct endpoint
    const params = {
      engine: "google_hotels",
      q: location, // location
      check_in_date: check_in_date,
      check_out_date: check_out_date,
      adults: guests || 1,
      currency: "USD",
      gl: "us",
      hl: "el",
      api_key: process.env.API_KEY
    };

    // Fetch data from SerpAPI
    const response = await axios.get(apiUrl, { params });

    // Send response back to the frontend
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching flight data:", error.message);
    res.status(500).json({ error: "Failed to fetch hotel data" });
  }
};

module.exports = { getHotels };
