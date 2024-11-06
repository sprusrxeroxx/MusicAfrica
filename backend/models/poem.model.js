import mongoose from "mongoose";

const poemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    lyrics: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true // Firebase user ID
    },
    isPrivate: {
        type: Boolean,
        default: false // Default state is public
    }
}, {
    timestamps: true
});

export const Poem = mongoose.model('Poem', poemSchema);