import React, { useState } from "react";
import styles from "../styles/FlightsPage.module.css";
import FlightsSearchBox from "../components/FlightsSearchBox";
import Navbar from "../components/Navbar";
import FlightCard from "../components/FlightCard";

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError("");
    setFlights([]);

    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      console.log(queryParams);
      const response = await fetch(`http://localhost:5000/api/flights?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setFlights({
          bestFlights: data.best_flights || [],
          otherFlights: data.other_flights || [],
        });
      } else {
        setError(data.error || "Failed to fetch flights.");
      }
    } catch (err) {
      setError("An error occurred while fetching flights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.flightsPage}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className={styles.heroContainer}>
        <img
          src={require("../images/1920.jpg")}
          alt="Hero"
          className={styles.heroImage}
        />
        <div className={styles.heroText}>
          <h1>Find Your Perfect Flight</h1>
          <p>Search, compare, and book flights with ease.</p>
        </div>
      </div>

      {/* Search Box */}
      <div className={styles.searchContainer}>
        <FlightsSearchBox onSearch={handleSearch} />
      </div>

      {/* Results Section */}
      <div className={styles.resultsContainer}>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {/* Best Flights */}
        {flights.bestFlights?.length > 0 && (
          <div className={styles.bestFlights}>
            <h2>Top Departing Flights</h2>
            {flights.bestFlights.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))}
          </div>
        )}

        {/* Other Flights */}
        {flights.otherFlights?.length > 0 && (
          <div className={styles.otherFlights}>
            <h2>Other Departing Flights</h2>
            {flights.otherFlights.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsPage;
