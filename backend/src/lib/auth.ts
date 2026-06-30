import type { Request } from "express";
import { verifyToken } from "./jwt";

export const getUserFromToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("(Unauthorized)");
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token!);
  return decoded.userId;
};
