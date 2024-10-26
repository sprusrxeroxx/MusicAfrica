// Controller containing the methods for each route in routes

import mongoose from "mongoose";
import Song from "../models/song.model";

export const getSongs = async (req, res) => {
    try {
        const songs = await Song.find({});
        res.status(200).json({ success: true, data: songs });
    } catch (error) {
        console.log("Error in fetching songs:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createSong = async (req, res) => {
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
};

export const updatedSong = async (req, res) => {
    const { id } = req.params;

    const song = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return  res.status(404).json({ success:false, message: "Song Not Found" });
    }

    try {
        const updatedSong= await Song.findByIdAndUpdate(id, song, {new:true});
        res.status(200).json({ success:true, data: updatedSong });
    } catch {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const deleteSong = async (req, res) => {
    const { id } = req.params;
    console.log("id:", id);

    try {
        await Song.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Song Deleted" });
    } catch (error) {
        console.error("Error in deleting the song:", error.message);
        res.status(404).json({ success: false, message: "Song Not Found" });
    }
};