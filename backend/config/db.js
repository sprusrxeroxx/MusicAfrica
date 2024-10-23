import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(precess.env.MONGO_URI);
        console.log('MongoDB Connected: ${conn.connection.host}');
    } catch (error) {
        console.error('Error: ${error.message}');
        process.exit(1); // exit code 1 means failure, else 0 sucess
    }
};