const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  // Check if an admin already exists
  const adminExists = await Admin.findOne({});

  if (adminExists) {
    return res.status(401).json({ message: "An admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({ username, password: hashedPassword });

  try {
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  // Check if the admin exists in the database
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Generate a JWT token
  const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.json({ token });
};

module.exports = { createAdmin, loginAdmin };
