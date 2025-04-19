import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

import dbConnect from "./config/db.js";
dbConnect();

import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

//Routes
app.use("/api/v1/auth", authRoutes);
// http://localhost:5000/api/v1/auth/register

app.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`);
});
