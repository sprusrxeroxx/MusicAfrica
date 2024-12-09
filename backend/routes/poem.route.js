// Routes pointing to User controller endpoints specified in requests

import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { addPoem, getPoem, getAllPoems } from "../controllers/poem.controller.js"

const router = express.Router();

router.get("/", getAllPoems);
router.get("/:id", getPoem);
router.post("/:id", addPoem);
router.put("/:id", updateUser);

// router.delete("/:id", deletePoem);

export default router;