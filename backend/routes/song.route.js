// Routes pointing to controller endpoints specified in requests

import express from "express";
import { createSong, getSongs, updateSong, deleteSong } from "../controllers/song.controller.js";

const router = express.Router();

router.get("/", getSongs);
router.post("/", createSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

export default router;