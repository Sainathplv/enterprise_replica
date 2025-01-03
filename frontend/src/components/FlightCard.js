import React, { useState } from "react";
import styles from "../styles/FlightCard.module.css";

const FlightCard = ({ flight, onSelect }) => {
  const { flights, price, airline_logo, type } = flight;
  const [isExpanded, setIsExpanded] = useState(false);

  // Summary details
  const departure = flights[0].departure_airport;
  const arrival = flights[flights.length - 1].arrival_airport;
  const duration = flights.reduce((acc, segment) => acc + segment.duration, 0);
  const stops = flights.length - 1;

  return (
    <div className={styles.flightCard}>
      {/* Summary */}
      <div className={styles.summary} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.airline}>
          <img src={airline_logo} alt="Airline Logo" />
          <p>{type}</p>
        </div>
        <div className={styles.details}>
          <p>{`${new Date(departure.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${new Date(arrival.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}</p>
          <p>{`${Math.floor(duration / 60)} hr ${duration % 60} min`}</p>
          <p>{stops === 0 ? "Nonstop" : `${stops} stop${stops > 1 ? "s" : ""}`}</p>
        </div>
        <div className={styles.price}>
          <p>${price}</p>
          <button className={styles.expandButton}>
            {isExpanded ? "Hide Details" : "View Details"}
          </button>
        </div>

      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className={styles.expandedDetails}>
          {flights.map((segment, index) => (
            <div key={index} className={styles.segment}>
              <p>
                <strong>From:</strong> {segment.departure_airport.name} ({segment.departure_airport.id})
              </p>
              <p>
                <strong>To:</strong> {segment.arrival_airport.name} ({segment.arrival_airport.id})
              </p>
              <p>
                <strong>Duration:</strong> {Math.floor(segment.duration / 60)} hr {segment.duration % 60} min
              </p>
            </div>
          ))}
          <button
            className={styles.selectButton}
            onClick={() => onSelect(flight)}
          >
            Select This Flight
          </button>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
