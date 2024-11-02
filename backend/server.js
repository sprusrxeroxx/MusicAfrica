// Express server listening to api requests and uses Routes to find endpoints

import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import songRoutes from "./routes/song.route.js"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.json()); // Middleware : allows us to accept JSON data in the request body
app.use(cookieParser());

app.use("/api/songs", songRoutes); // Links song request calls to endpoints
app.use("/api/users", userRoutes); // Links user request calls to endpoints

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});