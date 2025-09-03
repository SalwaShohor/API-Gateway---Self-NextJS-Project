import express from "express";
import axios from "axios";

const router = express.Router();
const TARGET_SERVICE_URL = process.env.TARGET_SERVICE_URL;

// GET ALL targets
router.get("/family-tree", async (req, res) => {
  try {
    const response = await axios.get(`${TARGET_SERVICE_URL}/family-tree`);
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

export default router;
