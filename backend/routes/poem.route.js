// Routes pointing to User controller endpoints specified in requests

import express from "express";
import { addPoem, getPoem, getAllPoems, updatePoem } from "../controllers/poem.controller.js"

const router = express.Router();

router
    .route("/:id")
    .get(getPoem)
    .post(addPoem)
    .put(updatePoem);

router.get("/", getAllPoems);

// router.delete("/:id", deletePoem);

export default router;