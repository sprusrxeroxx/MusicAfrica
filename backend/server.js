import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Song from "./models/song.model.js";

dotenv.config();

const app = express();

app.use(express.json()); // Middleware : allows us to accept JSON data in the request body

app.post("/api/songs", async (req, res) => {
    const song = req.body; // user will request data to http body 

    if(!song.title || !song.artist || !song.audioUrl || !song.lyrics || !song.duration) {
        return res.status(400).json({ success:false, message: "Please provide all fields!" });
    }

    const newSong = new Song(song);

    try {
        await newSong.save();
        res.status(201).json({ success:true, data:newSong });
    } catch (error) {
        console.error("Error in Creating a Song:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});
