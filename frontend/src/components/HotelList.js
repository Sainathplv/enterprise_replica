import React from "react";
import HotelCard from "./HotelCard";
import styles from "../styles/HotelList.module.css";

const HotelList = ({ hotels }) => {
  return (
    <div className={styles.hotelList}>
      {hotels.length > 0 ? (
        hotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))
      ) : (
        <p className={styles.noResults}>No hotels found. Try a different search.</p>
      )}
    </div>
  );
};

export default HotelList;
