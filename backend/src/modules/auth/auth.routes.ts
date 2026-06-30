import { Router } from "express";
import { signupHandler, signinHandler } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", signupHandler);
authRoutes.post("/login", signinHandler);
