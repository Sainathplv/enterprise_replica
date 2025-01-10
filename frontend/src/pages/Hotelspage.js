import React, { useState } from "react";
import styles from "../styles/HotelsPage.module.css";
import HotelsSearchBox from "../components/HotelsSearchBox";
import Navbar from "../components/Navbar";
import HotelList from "../components/HotelList";

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchResults = (results) => {
    setHotels(results); // Update the hotels state with the fetched data
  };

  return (
    <div className={styles.hotelsPage}>
      <Navbar />
      <div className={styles.heroContainer}>
        <div className={styles.heroText}>
          <h1>Find Your Perfect Stay</h1>
          <p>Search, compare, and book hotels with ease.</p>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <HotelsSearchBox onSearchResults={handleSearchResults} />
      </div>
      <div className={styles.resultsContainer}>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {hotels.length > 0 ? (
          <HotelList hotels={hotels} />
        ) : (
          !loading && <p>No hotels found. Try adjusting your search.</p>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
