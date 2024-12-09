// Controller containing the methods for each User route in routes

import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUser = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Errouserr in fetching songs:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createUser = async (req, res) => {
    const user = req.body; // user will request data to http body 

    if(!user.username || !user.password || !user.email || !user.firebaseUid) {
        return res.status(400).json({ success:false, message: "Please provide all fields!" });
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success:true, data:newUser });
    } catch (error) {
        console.error("Error in Creating Profile:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;

    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return  res.status(404).json({ success:false, message: "User Not Found" });
    }

    try {
        const updatedUser= await User.findByIdAndUpdate(id, user, {new:true});
        res.status(200).json({ success:true, data: updatedUser });
    } catch {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

// export const deleteSong = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return  res.status(404).json({ success:false, message: "Song Not Found" });
//     }

//     try {
//         await Song.findByIdAndDelete(id);
//         res.status(200).json({ success: true, message: "Song Deleted" });
//     } catch (error) {
//         console.error("Error in deleting the song:", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };