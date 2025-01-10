import React from "react";
import SignupForm from "../components/SignupForm";
import styles from "../styles/SignupForm.module.css"; // Reuse styles if needed

const SignupPage = () => {
  return (
    <div className={styles.signupContainer}>
      <SignupForm />
    </div>

  );
};

export default SignupPage;
