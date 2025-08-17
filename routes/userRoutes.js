const express = require("express");
const axios = require("axios");
const router = express.Router();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// GET all users
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST a user
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/users`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

module.exports = router;
