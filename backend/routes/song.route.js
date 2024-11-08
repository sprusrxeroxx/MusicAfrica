// Routes pointing to controller endpoints specified in requests

import express from "express";
import { createSong, getSongs, updateSong, deleteSong } from "../controllers/song.controller.js";
import verifyToken from "../middleware/index.js";

const router = express.Router();

router.get("/", getSongs);
router.post("/", verifyToken, createSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

export default router;