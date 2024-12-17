// Routes pointing to User controller endpoints specified in requests

import express from "express";
import FirebaseAuthController from '../controllers/firebase-auth-controller.js';
import { getUser, updateUser } from "../controllers/user.controller.js";
import {  getPoem, getAllPoems, createPoem, updatePoem, deletePoem } from "../controllers/poem.controller.js";

const router = express.Router();

// USER ROUTES

router.get("/", getUser);
router.post("/register", FirebaseAuthController.registerUser);
router.post("/login", FirebaseAuthController.loginUser);
router.post("/logout", FirebaseAuthController.logoutUser);
router.put("/:id", updateUser);

// POEM ROUTES

router.get("/poems", getAllPoems);

router
    .route("/:uid/poems")
    .get(getPoem)
    .post(createPoem);

router
    .route("/poems/:pid")
    .delete(deletePoem)
    .put(updatePoem);


// router.delete("/:id", deleteUser);

export default router;