import { Router } from "express";
import { meHandler } from "./user.controller";

export const userRoutes = Router();

userRoutes.get("/me", meHandler);
