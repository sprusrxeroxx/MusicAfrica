// Routes pointing to User controller endpoints specified in requests

import express from "express";
// import { createSong, getSongs, updateSong, deleteSong } from "../controllers/song.controller.js";
import { createUser } from "../controllers/user.controller.js";

const router2 = express.Router();

// router.get("/", getUser);
router2.post("/register", createUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router2;