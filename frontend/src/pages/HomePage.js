import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import styles from "../styles/HomePage.module.css";
import SearchBox from "../components/SearchBox";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const HomePage = () => {
  const [userId, setUserId] = useState(null); // State for user_id
  const { authState } = useAuth(); // Access global auth state
  const location = useLocation(); // Access the location object

  useEffect(() => {
    // Extract user_id from query parameters or AuthContext
    const params = new URLSearchParams(location.search);
    const userIdFromQuery = params.get("user_id");

    // Update user_id state
    if (userIdFromQuery) {
      setUserId(userIdFromQuery);
    } else if (authState.isAuthenticated) {
      setUserId(authState.user.user_id); // Use AuthContext if available
    }
  }, [location, authState]);

  const features = [
    {
      title: "Personalized Recommendations",
      description:
        "Get tailored suggestions based on your preferences and past searches. Let us help you find the perfect flights, hotels, or vacation packages.",
      image: require("../images/recom.jpg"),
    },
    {
      title: "Price Comparison",
      description:
        "Compare prices across multiple providers to ensure you always get the best deal.",
      image: require("../images/Stock.jpg"),
    },
    {
      title: "Interactive Map",
      description:
        "Explore destinations with our interactive map and find deals by clicking on the location.",
      image: require("../images/maps.png"),
    },
  ];

  return (
    <div className={styles.homePage}>
      <Navbar />

      {/* Running Update Section */}
      <div className={styles.runningUpdate}>
        <p>⚡️ Get the best deals today! Limited-time offers available now. ⚡️</p>
      </div>

      {/* Hero Container */}
      <div className={styles.heroContainer}>
        <img
          src={require("../images/pexels-andreimike-1271619.jpg")}
          alt="Hero"
          className={styles.heroImage}
        />
        <div className={styles.heroText}>
          <h1>Find Your Perfect Travel Plan</h1>
          <p>
            {userId
              ? `Welcome User #${userId}, start planning your next adventure!`
              : "Search, compare, and book your travel seamlessly. Start your journey today!"}
          </p>
        </div>
      </div>

      <div className={styles.searchSectionContainer}>
        <SearchBox />
      </div>

      {/* Features Scrollable Container */}
      <div className={styles.featuresScrollableContainer}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            {/* Image Section */}
            <div className={styles.featureImage}>
              <img
                src={feature.image}
                alt={feature.title}
                className={styles.image}
              />
            </div>

            {/* Divider Line */}
            <div className={styles.verticalDivider}></div>

            {/* Content Section */}
            <div className={styles.featureContent}>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className={styles.featuresContainer}>
        <h2 className={styles.featuresHeading}>Why Choose Us?</h2>
        <p className={styles.featuresSubHeading}>
          Explore the unique features that make your travel planning seamless and enjoyable.
        </p>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItems}>
            <h3>🔍 Personalized Recommendations</h3>
            <p>
              Get tailored suggestions based on your preferences and past searches. Let us help you find the perfect flights, hotels, or vacation packages.
            </p>
          </div>
          <div className={styles.featureItems}>
            <h3>💸 Price Comparison</h3>
            <p>
              Compare prices across multiple providers to ensure you always get the best deal.
            </p>
          </div>
          <div className={styles.featureItems}>
            <h3>🗺️ Interactive Map</h3>
            <p>
              Explore destinations with our interactive map and find deals by clicking on the location.
            </p>
          </div>
          <div className={styles.featureItems}>
            <h3>📋 Save and Plan Trips</h3>
            <p>
              Save your favorite destinations and create your personalized travel plans in a few clicks.
            </p>
          </div>
          <div className={styles.featureItems}>
            <h3>⚡ Real-Time Deals</h3>
            <p>
              Access trending destinations and real-time offers with our up-to-date deal finder.
            </p>
          </div>
          <div className={styles.featureItems}>
            <h3>🔒 Secure Booking</h3>
            <p>
              Book your travel confidently with our seamless and secure payment gateway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;