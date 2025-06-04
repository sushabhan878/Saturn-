import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json({ limit: "10mb" })); // You can increase this to 20mb if needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API Endpoints
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
connectDB();
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
