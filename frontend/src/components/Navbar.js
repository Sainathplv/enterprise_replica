import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const { authState, logout } = useAuth(); // Access authState and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Reset authentication state
    navigate("/"); // Redirect to the home page after logout
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>
        <Link to="/">Travel Finder</Link>
      </h1>
      <div className={styles.links}>
        <Link to="/flights">
          <i className="bi bi-airplane" /> Flights
        </Link>
        <Link to="/hotels">
          <i className="bi bi-building" /> Hotels
        </Link>
        <Link to="/vacations">
          <i className="bi bi-backpack2" /> Vacations
        </Link>
        <Link to="/TBlog">
          <i className="bi bi-bookmark-heart" /> TBlog
        </Link>
        <Link to="/Contact Us">
          <i className="bi bi-telephone" /> Contact Us
        </Link>
        {authState.isAuthenticated ? (
          <>
            <span className={styles.username}>
              <i className="bi bi-person-circle" /> Welcome, {authState.user.first_name}
            </span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <i className="bi bi-box-arrow-right" /> Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <i className="bi bi-person" /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;