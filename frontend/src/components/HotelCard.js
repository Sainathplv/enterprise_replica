import React from "react";
import styles from "../styles/HotelCard.module.css";

const HotelCard = ({ hotel }) => {
  const {
    name,
    type,
    link,
    rate_per_night,
    overall_rating,
    reviews,
    amenities = [],
    images = [],
  } = hotel;

  return (
    <div className={styles.hotelCard}>
      {/* Hotel Image */}
      <div className={styles.imageContainer}>
        <img
          src={images[0]?.thumbnail || "default-image.jpg"} // Use the first thumbnail or a default image
          alt={`${name} Thumbnail`}
          className={styles.hotelImage}
        />
      </div>

      {/* Hotel Details */}
      <div className={styles.details}>
        <h2 className={styles.name}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h2>
        <p className={styles.type}>{type}</p>
        <div className={styles.pricingRating}>
          <p className={styles.price}>
            {rate_per_night?.lowest ? `$${rate_per_night.lowest}` : "Price unavailable"}
          </p>
          <p className={styles.rating}>⭐ {overall_rating || "N/A"}</p>
        </div>
        <p className={styles.reviews}>{reviews} reviews</p>

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

      {/* View Offer Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.viewOffer}
      >
        View Offer
      </a>
    </div>
  );
};

export default HotelCard;
