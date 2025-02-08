import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import likesRoutes from "./routes/likes.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();
const app = express();

// ✅ Apply CORS before routes
const allowedOrigin = "https://meety-frontend-beta.vercel.app";
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle Preflight (OPTIONS) Requests
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging Logs
console.log("🚀 Server is running...");
console.log("✅ Allowed Origin:", allowedOrigin);

// ✅ Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/likes", likesRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Ensure CORS headers are present in all responses
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

export default app;
