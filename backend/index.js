import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js";
import hotelsRoute from "./api/routes/hotels.js";
import usersRoute from "./api/routes/users.js";
import bookingsRoute from "./api/routes/bookings.js"
import roomsRoute from "./api/routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const uri = process.env.MONGO;
const PORT = process.env.PORT || 8800
// Function to connect to the database
const start = async () => {
  if (!uri) {
    throw new Error("auth DB_URI must be defined");
  }
  try {
    await mongoose.connect(uri);
    console.log("Server connected to MongoDb!");
  } catch (err) {
    console.error(err);
  }
};

// Event listeners for connection status
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

// Middleware and routes
app.use(cookieParser());
app.use(cors({}));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
// Start the server
app.listen(PORT, async () => {
  await start(); // Ensure the database connection is established
  console.log( `Server is running on port ${PORT}`);
});
