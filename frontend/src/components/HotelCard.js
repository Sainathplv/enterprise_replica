import React, { useState } from "react";
import styles from "../styles/HotelCard.module.css";

const HotelCard = ({ flight }) => {
  const { name, type, location, price_per_night, rating, amenities, image, } = hotel;
//   const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={styles.hotelCard}>
      {/* Hotel Image */}
      <div className={styles.imageContainer}>
        <img src={image} alt={`${name} Thumbnail`} className={styles.hotelImage} />
      </div>

      {/* Hotel Details */}
      <div className={styles.details}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.type}>{type}</p>
        <p className={styles.location}>{location}</p>

        <div className={styles.pricingRating}>
          <p className={styles.price}>From {price_per_night} per night</p>
          <p className={styles.rating}>⭐ {rating}</p>
        </div>

        {/* Amenities */}
        <div className={styles.amenities}>
          {amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className={styles.amenity}>
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && <span>+ more</span>}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
