import express from "express";
import authRoute from "./routes/auth.route.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});
