// SERVER
import express from "express";

// ENVIRONMENT
import dotenv from "dotenv";

// DATABASE CONNECTOR
import { connectDB } from './config/db.js';

// MIDDLEWARE
import cookieParser from "cookie-parser";

// ROUTES
import songRoutes from "./routes/song.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); // Middleware : allows us to accept JSON data in the request body

app.use(cookieParser()); // MIddleware : stores session data in cookies-cache

app.use("/api/songs", songRoutes); // Links song request calls to endpoints
app.use("/api/users", userRoutes); // Links user request calls to endpoints

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});