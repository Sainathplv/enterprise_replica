import React from "react";
import styles from "../styles/FlightsPage.module.css";
import FlightsSearchBox from "../components/FlightsSearchBox";
import Navbar from "../components/Navbar";

const FlightsPage = () => {
  return (
    <div className={styles.flightsPage}>
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
      <FlightsSearchBox />
    </div>
  );
};

export default FlightsPage;
