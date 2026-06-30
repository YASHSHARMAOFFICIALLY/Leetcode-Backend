import type { Request, Response } from "express";
import { z } from "zod";
import { signup, signin } from "./auth.service";
import { registerSchema } from "./auth.schema";

// Login only checks that credentials are PRESENT — not register's min(8) rule.
// A wrong password is the service's job (401), not a validation failure (400).
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function signupHandler(req: Request, res: Response) {
  const body = registerSchema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ message: "Invalid input" });
  try {
    return res.status(201).json(await signup(body.data));
  } catch (e) {
    return res.status(409).json({ message: (e as Error).message });
  }
}

export async function signinHandler(req: Request, res: Response) {
  const body = loginSchema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ message: "Invalid input" });
  try {
    return res.json(await signin(body.data.email, body.data.password));
  } catch (e) {
    return res.status(401).json({ message: (e as Error).message });
  }
}
