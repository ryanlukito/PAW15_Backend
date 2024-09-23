import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import productRoute from "./src/routes/productRoute.js";
import userRoute from "./src/routes/userRoute.js";
import authRoute from "./src/routes/authRoute.js";
import dummyProductRoute from "./src/routes/dummyprodRoute.js";

dotenv.config();

const server = express();
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("Backend server PAW kelompok 5");
});

server.use("/api/v1", authRoute);
server.use("/api/v1", userRoute);
server.use("/api/v1", productRoute);
server.use("/api/v1", dummyProductRoute);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Server running on port ${process.env.SERVER_PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();