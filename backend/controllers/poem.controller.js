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
    const { uid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(uid)) {
        return  res.status(404).json({ success:false, message: "User Not Found" });
    }

    try {
        const user = await User.find({ _id: uid }, { 
            username: 1, 
            'poems.title': 1, 
            'poems.lyrics': 1, 
            'poems.tags': 1, 
            _id: 1
        }); // Query to fetch the poems of id match user
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Error in fetching poems:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createPoem = async (req, res) =>
    {
        const { uid } = req.params;
        const { title, lyrics, tags } = req.body.poems; // Extract poem data from the request body
        
        if (!mongoose.Types.ObjectId.isValid(uid)) {
            return  res.status(404).json({ success:false, message: "User Not Found" });
        }
    
        // Appending to the poems array
        await User.findByIdAndUpdate(
            uid,
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
        const { uid, pid } = req.params;
        const { title, lyrics, tags } = req.body.poems; // Extract poem data from the request body
        console.log(uid, pid)
        
        if (!mongoose.Types.ObjectId.isValid(uid)) {
            return  res.status(404).json({ success:false, message: "User Not Found \n" });
        }
    
        // Updating the poems array
        await User.updateOne(
            { _id: uid, 'poems._id': pid },
            {
                $set: { 
                        "poems.$.title": title, 
                        "poems.$.lyrics": lyrics, 
                        "poems.$.tags": tags
                    // broken : fix method to take in pid as search parameter !!
                }
        }, 
        { new: true })
            .then(user => {
                console.log('Poem updated successfully:\n', { title, lyrics, tags });
                res.status(200).json({ success:true, data: { title, lyrics, tags } });
            })
            .catch(err => {
                console.error('Poem cannot be found: \n', err);
            });
    };
};

export const deletePoem = async (req, res) => {
    const { uid, pid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(uid)) {
        return  res.status(404).json({ success:false, message: "User Not Found" });
    }

    try {
        await User.updateOne({ _id: uid }, { $pull: { poems: { _id: pid } } } );
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error in deleting the User:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};