// Routes pointing to User controller endpoints specified in requests

import express from "express";
import FirebaseAuthController from '../controllers/firebase-auth-controller.js';
import User from "../models/user.model.js";
import { getUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUser);
router.post("/register", FirebaseAuthController.registerUser);
router.post("/login", FirebaseAuthController.loginUser);
router.post("/logout", FirebaseAuthController.logoutUser);
router.put("/:id", updateUser);

// router.delete("/:id", deleteUser);

export default router;