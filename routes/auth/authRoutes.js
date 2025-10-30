import express from "express";
import axios from "axios";

const router = express.Router();
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// ✅ Forward: Register Options
router.post("/register-options", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/auth/register-options`,
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching register options:", err.message);
    if (err.response) {
      console.error("Gateway error:", err.response.status, err.response.data);
      return res.status(err.response.status).json(err.response.data);
    }
    console.error("Gateway error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Forward: Register Verify
router.post("/register-verify", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/auth/register-verify`,
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );
    res.json(response.data);
  } catch (err) {
    if (err.response) {
      console.error("Gateway error:", err.response.status, err.response.data);
      return res.status(err.response.status).json(err.response.data);
    }
    console.error("Gateway error:", err.message);
    res.status(500).json({ error: "Gateway Internal Error" });
  }
});

// 🔹 Forward: POST /api/auth/prelogin
router.post("/prelogin", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/api/auth/prelogin`,
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.error || "User service error (prelogin)",
    });
  }
});

// ✅ Forward: Login Options
// routes/authRoutes.js (API Gateway)
router.get("/login-options", async (req, res) => {
  try {
    // forward query params (and headers if needed)
    const response = await axios.get(`${USER_SERVICE_URL}/auth/login-options`, {
      params: req.query,
      headers: {
        // forward auth headers if needed:
        // authorization: req.headers.authorization,
      },
      timeout: 10000,
    });

    res.json(response.data);
  } catch (err) {
    console.error("Error fetching login options:", err?.message || err);
    // propagate backend status and message where appropriate:
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(500).json({ error: "Failed to fetch login options" });
  }
});

// ✅ Forward: Login Verify
router.post("/login-verify", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/auth/login-verify`,
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error verifying login:", err.message);
    res.status(500).json({ error: "Failed to verify login" });
  }
});

// ✅ Forward: Get All Users
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
