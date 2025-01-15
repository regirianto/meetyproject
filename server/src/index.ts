import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Server is running.....");
});

// Running Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
