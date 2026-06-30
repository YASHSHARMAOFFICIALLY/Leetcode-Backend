import type { Request, Response } from "express";
import { verifyToken } from "../lib/jwt";

// Returns the authenticated userId, OR sends a 401 and returns null to short-circuit.
// Caller: `const userId = requireAuth(req, res); if (userId === null) return;`
export function requireAuth(req: Request, res: Response): number | null {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    res.status(401).json({ message: "Missing token" });
    return null;
  }
  try {
    return verifyToken(token).userId;
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
    return null;
  }
}
