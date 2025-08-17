import express from "express";
import axios from "axios";

const router = express.Router();
const TARGET_SERVICE_URL = process.env.TARGET_SERVICE_URL;

//Forward search request to backend target
router.get("/search/:icNumber", async (req, res) => {
  try {
    const { icNumber } = req.params;
    const response = await axios.get(
      `${TARGET_SERVICE_URL}/target/search/${icNumber}`
    );
    console.log("Backend-target responded:", response.data);
    res.json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      console.error("Error forwarding search:", err.message);
      res.status(500).json({ message: "Gateway error" });
    }
  }
});

// POST /api/target
router.post("/new-target", async (req, res) => {
  try {
    const response = await axios.post(
      `${TARGET_SERVICE_URL}/target/new-target`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Gateway error adding target:", err.message);
    res.status(500).json({ message: "Gateway error" });
  }
});

// GET ALL targets
router.get("/all-target", async (req, res) => {
  try {
    const response = await axios.get(`${TARGET_SERVICE_URL}/target/all-target`);
    console.log("Backend-target responded:", response.data);
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

// DELETE by icNumber
router.delete("/delete-by-ic/:icNumber", async (req, res) => {
  try {
    const { icNumber } = req.params;
    const response = await axios.delete(
      `${TARGET_SERVICE_URL}/target/delete-by-ic/${icNumber}`
    );
    res.json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      console.error("Error forwarding delete:", err.message);
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
