import React, { useState } from "react";
import styles from "../styles/FlightsSearchBox.module.css";

const HotelsSearchBox = ({ onSearchResults }) => {
  const [location, setLocation] = useState("");
  const [check_in_date, setCheck_in_date] = useState("");
  const [check_out_date, setCheck_out_date] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearchClick = async () => {
    try {
      // Construct API URL with query parameters
      const apiUrl = `http://localhost:5001/api/hotels?location=${location.replace(
        / /g,
        "+"
      )}+Resorts&check_in_date=${check_in_date}&check_out_date=${check_out_date}&guests=${guests}`;

      // Fetch data from the backend
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        // Pass only the properties array to the parent component
        onSearchResults(data.properties || []);
      } else {
        console.error("Error fetching hotels:", data.error);
        onSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      onSearchResults([]);
    }
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.inputFields}>
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className={styles.labeledField}>
          <label htmlFor="check_in_date">Check-In Date</label>
          <input
            id="check_in_date"
            type="date"
            value={check_in_date}
            onChange={(e) => setCheck_in_date(e.target.value)}
          />
        </div>
        <div className={styles.labeledField}>
          <label htmlFor="check_out_date">Check-Out Date</label>
          <input
            id="check_out_date"
            type="date"
            value={check_out_date}
            onChange={(e) => setCheck_out_date(e.target.value)}
          />
        </div>
        <div className={styles.labeledField}>
          <label htmlFor="guests">Guests</label>
          <input
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
          />
        </div>
      </div>
      <button className={styles.searchButton} onClick={handleSearchClick}>
        Search Hotels
      </button>
    </div>
  );
};

export default HotelsSearchBox;
