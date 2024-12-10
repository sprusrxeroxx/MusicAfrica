// Global Controller containing the common methods between routes

import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getAllPoems = async (req, res) => {
    try {
        const user = await User.find(  // Query to fetch all users poems
            {}, 
            {
                username: 1,
                'poems.title': 1, 
                'poems.lyrics': 1,
                'poems.tags': 1,
                'poems._id': 1
            })
                .sort({ poems: -1}
        );
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
            _id: 1
        }); // Query to fetch the poems of id match user
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Errouserr in fetching songs:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createPoem = async (req, res) =>
    {
        const { id } = req.params;
        const { title, lyrics, tags } = req.body.poems; // Extract poem data from the request body
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return  res.status(404).json({ success:false, message: "User Not Found" });
        }
    
        // Appending to the poems array
        await User.findByIdAndUpdate(
            id,
            {
                $push: { 
                    poems: { title, lyrics, tags } 
                }
        }, 
        { new: true })
            .then(user => {
                console.log('Poem added successfully: \n', title, lyrics, tags  );
                res.status(200).json({ success:true, data: { title, lyrics, tags } });
            })
            .catch(err => {
                console.error('Error adding poem:', err);
            });
    };

export const updatePoem = async (req, res) => {
    {
        const { id } = req.params;
        const { title, lyrics, tags } = req.body.poems; // Extract poem data from the request body
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return  res.status(404).json({ success:false, message: "User Not Found" });
        }
    
        // Updating the poems array
        await User.findByIdAndUpdate(
            { 'poems._id': id },
            {
                $set: { 
                    poems: { title, lyrics, tags } // broken : fix method to take in poemId as search parameter !!
                }
        }, 
        { new: true })
            .then(user => {
                console.log('Poem updated successfully:\n', { title, lyrics, tags });
                res.status(200).json({ success:true, data: { title, lyrics, tags } });
            })
            .catch(err => {
                console.error('Error adding poem:', err);
            });
    };
};

export const deletePoem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return  res.status(404).json({ success:false, message: "User Not Found" });
    }

    try {
        await User.findByIdAndDelete({"poems._id": id});
        res.status(200).json({ success: true, message: "User Deleted" });
    } catch (error) {
        console.error("Error in deleting the User:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};