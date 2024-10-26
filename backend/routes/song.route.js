// Routes pointing to controller endpoints specified in requests

import express from "express";
import { createSong, getSongs, updatedSong, deleteSong } from "../controllers/song.controller.js";

const router = express.Router();

router.get("/", getSongs);
router.post("/", createSong);
router.put("/:id", updatedSong);
router.delete("/:id", deleteSong);

export default router;