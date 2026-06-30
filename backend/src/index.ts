import express from "express";
import { config } from "./config";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get("/health", (_req, res) => res.send("ok"));

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
