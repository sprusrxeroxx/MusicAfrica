import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail
 } from '../config/firebase.js';

import admin from '../config/firebase.js';
import User from '../models/user.model.js';


const auth = getAuth();

class FirebaseAuthController {

    async registerUser (req, res) {
        const { email, password, username } = req.body;
        if (!email || !password) {
            return (
                res.status(422).json({ 
                    email: "Email is required!", 
                    password: "Password is required!" })
            );
        }
        
        try {// Create user in firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
            // I have to Add send email verification method later
            
            const firebaseUid = userCredential.user.uid;

            //Create a user using MongoDb
            let newUser = new User({
                firebaseUid,
                email,
                username,
                password
            });
            await newUser.save();
        
            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: {
                    email: newUser.email,
                    username: newUser.username,
                    uid: firebaseUid
                }
            });
        } catch (error) {
            // console.error(error);
            res.status(500).json({
                success: false,
                message: "An error occured while registering user"
            })
        }
    };

    loginUser(req, res) {

        const { email, password } =req.body;

        if (!email || !password) {
            return (
                res.status(422).json({ 
                    success: false, 
                    email: "Email is required", 
                    password: "Password is required"
                })
            )}

            // const user = await User.findOne({ email }).select('+password');

            // if (!user) {
            //     return (
            //         res.status(402).json({
            //             success: false,
            //             message: 'Invalid credentials'
            //         })
            //     )
            // }

            try {
                signInWithEmailAndPassword(auth, email, password).then (
                (userCredentail) => {
                    const idToken = userCredentail._tokenResponse.idToken;
                    if(idToken) {
                        res.cookie('access_token', { httpOnly: true });
                    }
                    res.status(200).json({ 
                        success: true, 
                        message: "User logged in successfully", 
                        userCredentail 
                    })
                })} catch (error) {
                    res.status(500).json({ 
                        success: false, 
                        message: "Internal Server Error"
                })
            }
    }

    logoutUser(req, res) {
        signOut(auth).then(() => {
            res.clearCookie('access_token');
            res.status(200).json({
                message: "User logged out successfully"
            });
        }).catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
}

export default new FirebaseAuthController();