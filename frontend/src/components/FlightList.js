import React from "react";
import styles from "../styles/FlightList.module.css";

const FlightList = ({ flights }) => {
  return (
    <div className={styles.flightList}>
      {flights.length === 0 ? (
        <p>No flights available</p>
      ) : (
        flights.map((flight) => (
          <div key={flight.id} className={styles.flightCard}>
            <h3>{flight.city}</h3>
            <p>Price: ${flight.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FlightList;
