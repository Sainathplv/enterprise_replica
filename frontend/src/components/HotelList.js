import React from "react";
import HotelCard from "./HotelCard";

const HotelList = ({ hotels }) => {
  return (
    <div>
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;