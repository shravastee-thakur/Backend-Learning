import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

import DbConnect from "./Config/DbConnect.js";
DbConnect();
import authRoute from "./Route/authRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//Middelwares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // 💥 allow cookies
  })
);
app.use(cookieParser());

app.use("/api/v1/user", authRoute);
// http://localhost:3000/api/v1/user/register

app.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`);
});
