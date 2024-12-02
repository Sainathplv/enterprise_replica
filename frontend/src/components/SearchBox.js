import React, { useState } from "react";
import styles from "../styles/SearchBox.module.css";

const SearchBox = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    console.log(`Searching for flights from ${departure} to ${destination}`);
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="From"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBox;
