import React, { useState } from "react";
import styles from "../styles/FlightsPage.module.css";
import FlightsSearchBox from "../components/FlightsSearchBox";
import Navbar from "../components/Navbar";
import FlightCard from "../components/FlightCard";

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [returnFlights, setReturnFlights] = useState([]);
  const [loadingReturn, setLoadingReturn] = useState(false);
  const [returnError, setReturnError] = useState("");
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError("");
    setFlights([]);
    setSelectedOutbound(null);
    setReturnFlights([]);
    setSelectedReturn(null);
    setShowSummary(false);

    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      const response = await fetch(`http://localhost:5001/api/flights?${queryParams}`);
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

  const fetchReturnFlights = async (returnDate, from, to) => {
    setLoadingReturn(true);
    setReturnError("");
    setReturnFlights([]);

    try {
      const queryParams = new URLSearchParams({
        departureDate: returnDate,
        from: to, // Reverse 'from' and 'to'
        to: from,
      }).toString();

      const response = await fetch(`http://localhost:5001/api/flights?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setReturnFlights({
          bestFlights: data.best_flights || [],
          otherFlights: data.other_flights || [],
        });
      } else {
        setReturnError(data.error || "Failed to fetch return flights.");
      }
    } catch (err) {
      setReturnError("An error occurred while fetching return flights.");
    } finally {
      setLoadingReturn(false);
    }
  };

  const handleOutboundSelection = (flight, searchParams) => {
    setSelectedOutbound(flight);
    fetchReturnFlights(searchParams.returnDate, searchParams.from, searchParams.to);
  };

  const handleFlightSelection = (flight) => {
    if (!selectedOutbound) {
      setSelectedOutbound(flight);
    } else {
      setSelectedReturn(flight);
      setShowSummary(true);
    }
  };

  const handlePayment = () => {
    alert("Proceeding to payment!");
    // Redirect to payment page or handle payment logic
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
        {loading && <p>Loading outbound flights...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {/* Outbound Flights */}
        {!selectedOutbound && (
          <>
            <div className={styles.bestFlights}>
              <h2>Best Departing Flights</h2>
              {flights.bestFlights?.map((flight, index) => (
                <FlightCard
                  key={index}
                  flight={flight}
                  onSelect={(flight) => handleOutboundSelection(flight, { from: "XYZ", to: "ABC", returnDate: "2024-12-15" })}
                />
              ))}
            </div>

            <div className={styles.otherFlights}>
              <h2>Other Departing Flights</h2>
              {flights.otherFlights?.map((flight, index) => (
                <FlightCard
                  key={index}
                  flight={flight}
                  onSelect={(flight) => handleOutboundSelection(flight, { from: "XYZ", to: "ABC", returnDate: "2024-12-15" })}
                />
              ))}
            </div>
          </>
        )}

        {/* Return Flights */}
        {selectedOutbound && !selectedReturn && (
          <>
            {loadingReturn && <p>Loading return flights...</p>}
            {returnError && <p className={styles.error}>{returnError}</p>}

            <div className={styles.bestFlights}>
              <h2>Best Return Flights</h2>
              {returnFlights.bestFlights?.map((flight, index) => (
                <FlightCard
                  key={index}
                  flight={flight}
                  onSelect={(flight) => setSelectedReturn(flight)}
                />
              ))}
            </div>

            <div className={styles.otherFlights}>
              <h2>Other Return Flights</h2>
              {returnFlights.otherFlights?.map((flight, index) => (
                <FlightCard
                  key={index}
                  flight={flight}
                  onSelect={(flight) => setSelectedReturn(flight)}
                />
              ))}
            </div>
          </>
        )}

        {/* Summary */}
        {showSummary && (
          <div className={styles.summaryContainer}>
            <h2>Flight Summary</h2>
            <p>
              <strong>Outbound Flight:</strong> {selectedOutbound.flights[0].departure_airport.name} → {selectedOutbound.flights[selectedOutbound.flights.length - 1].arrival_airport.name}
            </p>
            <p>
              <strong>Return Flight:</strong> {selectedReturn.flights[0].departure_airport.name} → {selectedReturn.flights[selectedReturn.flights.length - 1].arrival_airport.name}
            </p>
            <p>
              <strong>Total Price:</strong> ${selectedOutbound.price + selectedReturn.price}
            </p>
            <button className={styles.paymentButton} onClick={handlePayment}>
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsPage;
