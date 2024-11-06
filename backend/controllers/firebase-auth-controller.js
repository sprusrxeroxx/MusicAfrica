import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail
 } from '../config/firebase.js';

import mongoose from 'mongoose';
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
        
        // Create user in firebase
        const UserRecord = await createUserWithEmailAndPassword(auth, email, password).then(() => {
            res.status(201).json({
            success: true, 
            message: "Verification email sent! User created successfully!"
            });
        }).catch((error) => {
                    console.error(error);
                    res.status(500).json({ 
                        success: false, 
                        message: "An error occured while registering user"
                    });
            }).catch((error) => {
                const errorMessage= error.message;

                res.status(500).json({
                    success: false,
                    message: errorMessage
                });
            })

        // Create a user using MongoDb
        const newUser = new User({
            email,
            password,
            firebaseUid: UserRecord.uid,
            username
        });

        newUser.save();

        res.status(201).json({
            message: 'User successfully added to database',
            user: {
                email: newUser.email,
                username: newUser.username,
                uid: UserRecord.uid
            }
        })
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

            try {signInWithEmailAndPassword(auth, email, password).then (
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