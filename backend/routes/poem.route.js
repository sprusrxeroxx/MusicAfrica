// Routes pointing to User controller endpoints specified in requests

import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { addPoem, getPoem, getAllPoems } from "../controllers/poem.controller.js"

const router = express.Router();

router
    .route("/:id")
    .get(getPoem)
    .post(addPoem)
    .put(updateUser);

router.get("/", getAllPoems);

// router.delete("/:id", deletePoem);

export default router;