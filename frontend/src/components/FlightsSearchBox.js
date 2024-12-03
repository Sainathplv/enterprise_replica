import React, { useState } from "react";
import styles from "../styles/FlightsSearchBox.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const FlightsSearchBox = () => {
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  return (
    <div className={styles.searchBox}>
      {/* Trip Type Selection */}
      <div className={styles.tripType}>
        <button
          className={tripType === "one-way" ? styles.active : ""}
          onClick={() => setTripType("one-way")}
        >
          One Way
        </button>
        <button
          className={tripType === "round-trip" ? styles.active : ""}
          onClick={() => setTripType("round-trip")}
        >
          Round Trip
        </button>
        <button
          className={tripType === "multi-city" ? styles.active : ""}
          onClick={() => setTripType("multi-city")}
        >
          Multi City
        </button>
      </div>

      {/* Input Fields */}
      <div className={styles.inputFields}>
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <div className={styles.labeledField}>
          <label htmlFor="departureDate">Departure Date</label>
          <input
            id="departureDate"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        {tripType === "round-trip" && (
          <div className={styles.labeledField}>
            <label htmlFor="returnDate">Return Date</label>
            <input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}
        <div className={styles.labeledField}>
          <label htmlFor="passengers">
            <i className="bi bi-people" /> Passengers
          </label>
          <input
            id="passengers"
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            min="1"
          />
        </div>
      </div>

      {/* Search Button */}
      <button className={styles.searchButton}>Search Flights</button>
    </div>
  );
};

export default FlightsSearchBox;
