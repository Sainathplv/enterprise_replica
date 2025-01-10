const pool = require("../db");
const sendEmail = require("../utils/emailSender");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: "No account found with this email." });
    }
    const userData = user.rows[0]; // Extract user data
    const password = userData.password; // Extract password
    // Generate a reset token (for simplicity, using a random string)
    const resetToken = Math.random().toString(36).substr(2);
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // Store the reset token in the database
    await pool.query("UPDATE users SET reset_token = $1 WHERE email = $2", [resetToken, email]);

    // Send the reset email
    const emailSent = await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hi ${userData.first_name},</p>
        <p>You requested to reset your password. Below is your current password:</p>
        <p><strong>${password}</strong></p>
        <p>Alternatively, you can reset your password by clicking the link below:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>If you did not request this, please ignore this email.</p>
      `,
      text: `Hi ${user.rows[0].first_name},\nYou requested to reset your password. Use the link below to reset it:\n${resetLink}\nIf you did not request this, please ignore this email.`,
    });

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send the email. Please try again." });
    }

    res.status(200).json({ message: "Password reset email sent successfully." });
  } catch (err) {
    console.error("Error in forgotPassword:", err.message);
    res.status(500).json({ message: "An error occurred while processing your request." });
  }
};

module.exports = { forgotPassword };