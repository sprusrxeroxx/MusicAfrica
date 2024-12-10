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
    .route("/:id/poems")
    .get(getPoem)
    .post(createPoem);

router
    .route("/:id/poems/:id")
    .delete(deletePoem)
    .put(updatePoem);





// /api/users/               HOME FOR USER

// POEM ROUTES
//  api/users/poems             GET                     ALL POEMS 
//  api/users/:id/poems         GET|POST                ALL POEMS BY USER | CREATE A POEM
//  api/users/:id/poems/:id     GET|DEL|PUT             SPECIFIC POEM

// USER ROUTES
// api/users/:id            GET                     GET USER
//  api/users/login         POST                    SIGN IN USER
//  api/users/logout        POST                    SIGN OUT USER
//  api/users/register      POST                    CREATE USER
//  api/users/delete        POST                    DELETE USER
// api/users/update         PUT                     UPDATE USER


// router.delete("/:id", deleteUser);

export default router;