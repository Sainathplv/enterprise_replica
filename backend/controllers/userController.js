const pool = require("../db");

// Register User
const registerUser = async (req, res) => {
  const { first_name, last_name, phone_number, email, password, role, gender } = req.body;

  try {
    // Check if the user already exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, phone_number, email, password, role, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [first_name, last_name, phone_number, email, password, role, gender]
    );

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        user_id: newUser.rows[0].user_id,
        first_name: newUser.rows[0].first_name,
        last_name: newUser.rows[0].last_name,
        email: newUser.rows[0].email,
        role: newUser.rows[0].role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Compare the password
    if (user.rows[0].password !== password) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.json({
      message: "Login successful.",
      user: {
        user_id: user.rows[0].user_id,
        first_name: user.rows[0].first_name,
        last_name: user.rows[0].last_name,
        email: user.rows[0].email,
        role: user.rows[0].role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { registerUser, loginUser };