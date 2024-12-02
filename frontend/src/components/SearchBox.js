import React from "react";
import styles from "../styles/SearchBox.module.css";

const SearchSection = () => {
  return (
    <div className={styles.searchSection}>
      <h1>Travel Information</h1>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <i className="bi bi-search"></i>
        <input type="text" placeholder="Search for flights, hotels, and more" />
      </div>

      {/* Icons Section */}
      <div className={styles.iconRow}>
        <div className={styles.iconItem}>
          <i className="bi bi-binoculars" ></i>
          <span>Explore</span>
        </div>
        <div className={styles.iconItem}>
          <i className="bi bi-airplane"></i>
          <span>Flights</span>
        </div>
        <div className={styles.iconItem}>
          <i className="bi bi-building"></i>
          <span>Hotels</span>
        </div>
        <div className={styles.iconItem}>
          <i className="bi bi-house-door"></i>
          <span>Vacation rentals</span>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
