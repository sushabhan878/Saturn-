import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(cookieParser());

// API Endpoints
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
connectDB();
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
