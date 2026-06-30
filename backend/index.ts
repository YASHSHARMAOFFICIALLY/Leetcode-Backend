import express from "express";
import { createClient } from "redis";

const client = createClient();
client.connect();

const app = express();
app.use(express.json());

app.post("/submission", (req, res) => {
  const userId = req.body.userId;
  const code = req.body.code;
  const language = req.body.language;

  client.lPush("problems", JSON.stringify({ userId, code, language }));

  res.json({
    message: "processing",
  });
});
app.listen(3000);
