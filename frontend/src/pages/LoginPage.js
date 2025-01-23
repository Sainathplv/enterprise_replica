import React from "react";
import LoginForm from "../components/login_form";
import styles from "../styles/LoginForm.module.css"; // Reuse styles if needed

const LoginPage = () => {
  const handleLogin = (userData) => {
    console.log("Logged in user:", userData);
  };

  return (
    <div className={styles.loginContainer}>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
