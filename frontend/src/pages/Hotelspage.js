import React, { useState } from "react";
import styles from "../styles/HotelsPage.module.css";
import HotelsSearchBox from "../components/HotelsSearchBox";
import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError("");
    setHotels([]);

    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      console.log(queryParams);
      const response = await fetch(`http://localhost:5000/api/hotels?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setHotels({
          // need to understand abd build
        });
      } else {
        setError(data.error || "Failed to fetch hotels.");
      }
    } catch (err) {
      setError("An error occurred while fetching hotels.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.hotelsPage}>
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
          <h1>Find Your Perfect STAY</h1>
          <p>Search, compare, and book hotels with ease.</p>
        </div>
      </div>

      {/* Search Box */}
      <div className={styles.searchContainer}>
        <HotelsSearchBox onSearch={handleSearch} />
      </div>

        {/* Results Section */}
        <div className={styles.resultsContainer}>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {/* Display Hotels */}
        {hotels.length > 0 ? (
            <div className={styles.hotels}>
            {hotels.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
            ))}
            </div>
        ) : (
            !loading && <p>No hotels found. Try adjusting your search.</p>
        )}
        </div>
    </div>
  );
};

export default HotelsPage;
