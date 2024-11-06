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
import { UserRecord } from 'firebase-admin/auth';

 const auth = getAuth();

class FirebaseAuthController {

    registerUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return (
                res.status(422).json({ 
                    email: "Email is required!", 
                    password: "Password is required!" })
            );
        }
        
        // Create user in firebase
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            const newUser = new User({
                email,
                password,
                firebaseUid: UserRecord.uid,
            });

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