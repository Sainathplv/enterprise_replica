import React, { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";
import SearchBox from "../components/SearchBox";
import FlightList from "../components/FlightList";
import Navbar from "../components/Navbar"; 

const HomePage = () => {
  const [flights, setFlights] = useState([]); // Placeholder state for flights

  // Placeholder for API call
  useEffect(() => {
    // Example: setFlights([{ id: 1, city: 'Seattle', price: 50 }]);
    console.log("API call placeholder");
  }, []);

  return (
    <div className={styles.homePage}>
      <Navbar />
      
      {/* Running Update Section */}
      <div className={styles.runningUpdate}>
        <p>⚡️ Get the best deals today! Limited-time offers available now. ⚡️</p>
      </div>

      <div className={styles.heroContainer}>
        <div className={styles.heroText}>
          <h1>Find Your Perfect Flight</h1>
          <p>
            Search, compare, and book your flights seamlessly. Start your journey today!
          </p>
        </div>
      </div>
      
      <h1>Find Your Flight</h1>
      <SearchBox />
      <FlightList flights={flights} />
    </div>
  );
};

export default HomePage;
