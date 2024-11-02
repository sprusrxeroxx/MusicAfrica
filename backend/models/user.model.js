import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({ // Schema to dictate the structure of user info to be logged
        username:{
            type: String,
            required: true,
            unique: true,
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
            required: true,
            minlength: 6
        },
    },  
    {
        timestamps: true, // createdAt, updatedAt model logging
    }
);

//Hash password before saving 
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
