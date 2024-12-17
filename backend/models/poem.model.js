import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

const poemSchema = new mongoose.Schema({ // Schema to dictate the structure of poem info to be logged
        title:{
            type: String,
            required: true,
        },
        lyrics:{
            type: String,
            required: true,
        }, 
        tags:{
            type: Array,
        },
        uid:{
            type: String,
            required: true,
        },
    },  
    {
        timestamps: true, // createdAt, updatedAt model logging
    }
);

const Poem = mongoose.model('Poem', poemSchema);

export default Poem;