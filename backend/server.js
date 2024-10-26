// Express server listening to api requests and uses Routes to find endpoints

import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import songRoutes from "./routes/song.route.js"

dotenv.config();

const app = express();

app.use(express.json()); // Middleware : allows us to accept JSON data in the request body

app.use("/api/songs", songRoutes); // Links request calls to endpoints

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});
