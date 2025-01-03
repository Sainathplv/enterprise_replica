import React, { useState } from "react";
import styles from "../styles/ForgotPasswordForm.module.css";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Basic validation
    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Password reset email sent successfully.");
      } else {
        setError(result.message || "Failed to send password reset email.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.forgotPasswordBox}>
      <h2>Forgot Password</h2>
      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Send Reset Link
        </button>
        <div className={styles.linkContainer}>
          <Link to="/" className={styles.link}>
            Back to Homepage
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
