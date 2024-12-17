// Global Controller containing the common methods between routes

import mongoose from "mongoose";
import User from "../models/poem.model.js";
import Poem from "../models/poem.model.js";

export const getAllPoems = async (req, res) => {
    try {
        const poem = await Poem.find(  // Query to fetch all users poems
            {}, 
            {
                title: 1, 
                lyrics: 1,
                tags: 1,
                uid: 1
            })
                .sort({ uid: -1}
        );
        res.status(200).json({ success: true, data: poem });
    } catch (error) {
        console.log("Error in fetching poems:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getPoem = async (req, res) => {
    const { uid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(uid)) {
        return  res.status(404).json({ success:false, message: "User Not Found" });
    }

    try {
        const poem = await Poem.find({ uid: uid }, { 
            title: 1, 
            lyrics: 1, 
            tags: 1, 
        }); // Query to fetch the poems of id match user
        res.status(200).json({ success: true, data: poem });
    } catch (error) {
        console.log("Error in fetching poems:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createPoem = async (req, res) =>
    {
        const poem = req.body; // user will request data to http body
        const { uid } = req.params;

        poem.uid = uid;

        if(!poem.title || !poem.lyrics || !poem.uid) {
            return res.status(400).json({ success:false, message: "Please provide all fields!" });
        }

        // if (!mongoose.Types.ObjectId.isValid(poem.uid)) {
        //     return  res.status(404).json({ success:false, message: "User Not Found" });
        // }
    
        const newPoem = new Poem(poem);
    
        try {
            await newPoem.save();
            res.status(201).json({ success:true, data:newPoem.uid });
        } catch (error) {
            console.error("Error in Creating Poem:", error.message);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    };

export const updatePoem = async (req, res) => {
    const { pid } = req.params;

    const poem = req.body;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return  res.status(404).json({ success:false, message: "Poem Not Found" });
    }

    try {
        const updatedPoem= await Poem.findByIdAndUpdate(pid, poem, {new:true});
        res.status(200).json({ success:true, data: updatedPoem });
    } catch {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const deletePoem = async (req, res) => {
    const { pid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return  res.status(404).json({ success:false, message: "Poem Not Found" });
    }

    try {
        await Poem.findByIdAndDelete(pid);
        res.status(200).json({ success: true, message: "Poem Deleted" });
    } catch (error) {
        console.error("Error in deleting the song:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};