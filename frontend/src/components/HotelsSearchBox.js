import React, { useState } from "react";
import styles from "../styles/FlightsSearchBox.module.css";

const HotelsSearchBox = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [check_in_date, setCheck_in_date] = useState("");
  const [check_out_date, setCheck_out_date] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearchClick = () => {
    // Pass search parameters to the parent component
    const searchParams = {
      location,
      check_in_date,
      check_out_date,
      guests,
    };
    onSearch(searchParams);
  };

  return (
    <div className={styles.searchBox}>  
      {/* Input Fields */}
      <div className={styles.inputFields}>
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className={styles.labeledField}>
          <label htmlFor="check_in_date">Check In Date</label>
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

      {/* Search Button */}
      <button className={styles.searchButton} onClick={handleSearchClick}>
        Search Hotels
      </button>
    </div>
  );
};

export default HotelsSearchBox;
