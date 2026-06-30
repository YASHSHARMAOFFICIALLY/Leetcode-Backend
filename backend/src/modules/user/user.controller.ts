import type { Request, Response } from "express";
import { requireAuth } from "../../middleware/auth";
import { getById } from "./user.service";

export async function meHandler(req: Request, res: Response) {
  const userId = requireAuth(req, res);
  if (userId === null) return; // requireAuth already sent the 401

  const user = await getById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json(user);
}
