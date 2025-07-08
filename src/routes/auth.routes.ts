import express from "express";
import controllers from "../controllers/auth";
const { signup, login } = controllers;

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);

export default router;
