const axios = require("axios");

// Controller function to fetch flight data
const getFlights = async (req, res) => {
  try {
    const { from, to, departureDate, returnDate, tripType, passengers } = req.query;

    // Validate required fields
    if (!from || !to || !departureDate) {
      return res.status(400).json({ error: "Missing required fields: 'from', 'to', 'departureDate'" });
    }

    // Construct API request
    const apiUrl = "https://serpapi.com/search.json"; // Updated to the correct endpoint
    const params = {
      engine: "google_flights",
      departure_id: from,
      arrival_id: to,
      outbound_date: departureDate,
      return_date: tripType === "round-trip" ? returnDate : undefined,
      adults: passengers || 1,
      currency: "USD",
      hl: "en",
      api_key: process.env.API_KEY, // API key from .env
    };

    // Fetch data from SerpAPI
    const response = await axios.get(apiUrl, { params });

    // Send response back to the frontend
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching flight data:", error.message);
    res.status(500).json({ error: "Failed to fetch flight data" });
  }
};

module.exports = { getFlights };
