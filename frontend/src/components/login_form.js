import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/LoginForm.module.css"; // Import modular CSS

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!username || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Replace with actual API endpoint
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Pass login data to parent (e.g., LoginPage)
        onLogin(result.data);
        navigate(`/dashboard/${result.data.userid}`);
      } else {
        setError(result.message || "Incorrect username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.loginBox}>
      <h1>Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={styles.inputField}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.inputField}
          required
        />
        <input type="submit" value="Login" className={styles.submitButton} />
      </form>
      <div className={styles.linkContainer}>
        <Link to="/forgot-password" className={styles.link}>
          Forgot Password?
        </Link>
      </div>
      <div className={styles.linkContainer}>
        Don't have an account?{" "}
        <Link to="/signup" className={styles.link}>
          Sign Up
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <Link to="/" className={styles.link}>
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
