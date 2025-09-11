import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import targetRoutes from "./routes/targetRoutes.js";
import authRoutes from "./routes/auth/authRoutes.js";
import morgan from "morgan";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});

// Routes
app.use("/api/target", targetRoutes);
// app.use("/api", targetRoutes);
app.use("/api", authRoutes);
app.use("/api/auth", authRoutes);

// app.use("/api/auth", authRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Gateway Error" });
});

// Start server — bind to 0.0.0.0 so Docker can expose it
const PORT = process.env.PORT || 8103;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API Gateway running on port ${PORT}`);
});
