import express from "express";
import { login } from "../controllers/authController.js";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// no need protection routes

router.post("/login", login);
router.post("/register", createUser);

export default router;
