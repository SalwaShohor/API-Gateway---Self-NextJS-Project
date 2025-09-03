import express from "express";
import axios from "axios";

const router = express.Router();
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// GET ALL USER
router.get("/all-users", async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/auth/all-users`);
    console.log("Backend-user responded:", response.data);
    res.json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      console.error("Error forwarding fetch all:", err.message);
      res.status(500).json({ message: "Gateway error" });
    }
  }
});

export default router;

// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// const TARGET_SERVICE_URL = process.env.TARGET_SERVICE_URL;

// // GET all targets
// router.get("/", async (req, res) => {
//   try {
//     const response = await axios.get(`${TARGET_SERVICE_URL}/targets`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch targets" });
//   }
// });

// // POST a target
// router.post("/", async (req, res) => {
//   try {
//     const response = await axios.post(
//       `${TARGET_SERVICE_URL}/targets`,
//       req.body
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create target" });
//   }
// });

// module.exports = router;
