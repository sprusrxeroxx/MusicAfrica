// Global Controller containing the common methods between routes

import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getAllPoems = async (req, res) => {
    try {
        const user = await User.find(
            {}, 
            {
                username: 1, 
                'poems.title': 1, 
                'poems.lyrics': 1, 
                _id: 0 
            })
                .sort({ poems: -1}
        ); // Query to fetch all users poems
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Errouserr in fetching songs:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getPoem = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.find({ _id: id }, { 
            username: 1, 
            'poems.title': 1, 
            'poems.lyrics': 1, 
            'poems.tags': 1, 
            _id: 0 
        }); // Query to fetch the poems of id match user
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Errouserr in fetching songs:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const addPoem = async (req, res) =>
    {
        const { id } = req.params;
        const { title, lyrics, tags } = req.body.poem; // Extract poem data from the request body
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return  res.status(404).json({ success:false, message: "User Not Found" });
        }
    
        // Updating the user's poems array
        await User.findByIdAndUpdate(id,{
            $push: { poems: { title, lyrics, tags } }
        }, { new: true })
            .then(user => {
                console.log('Poem added successfully:', { title, lyrics, tags } );
                res.status(200).json({ success:true, data: { title, lyrics, tags } });
            })
            .catch(err => {
                console.error('Error adding poem:', err);
            });
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