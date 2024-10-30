import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ // Schema to dictate the structure of user info to be logged
        username:{
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        starsign:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: false
        },
        
        password:{
            type: String,
            required: true
        },
    },  
    {
        timestamps: true, // createdAt, updatedAt model logging
    }
);

const User = mongoose.model('User', userSchema);

export default User;
