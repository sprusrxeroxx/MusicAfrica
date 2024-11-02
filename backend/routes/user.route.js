// Routes pointing to User controller endpoints specified in requests

import express from "express";
// import { createSong, getSongs, updateSong, deleteSong } from "../controllers/song.controller.js";
// import { createUser } from "../controllers/user.controller.js";
import FirebaseAuthController from '../controllers/firebase-auth-controller.js';

const router = express.Router();

// router.get("/", getUser);
router.post("/register", FirebaseAuthController.registerUser);
router.post("/login", FirebaseAuthController.loginUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;