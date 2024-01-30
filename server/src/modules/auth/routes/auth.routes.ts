import express from "express";
import { authService } from "../auth.factory";

const authRoutes = express.Router();

authRoutes.post("/register", authService.register);

export default authRoutes;