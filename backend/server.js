import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

connectDB();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});