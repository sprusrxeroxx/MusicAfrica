import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({ // Schema to dictate the structure of song info to be logged
    title:{
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    lyrics:{
        type: String,
        required: true
    },
    audioUrl:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
},  {
    timestamp: true // createdAt, updatedAt model logging
});

const Song = mongoose.model('Song', songSchema);

export default Song;
