import { file, spawn } from "bun";
import { createClient } from "redis";
import fs from "fs";

const client = createClient();
client.connect().then(async () => {
  while (1) {
    const response = await client.rPop("problems");
    if (!response) {
      await new Promise((r) => setTimeout(r, 1000));
      continue;
    }
    const parsedResponse = JSON.parse(response);
    const code = parsedResponse.code;
    const language = parsedResponse.language;
    console.log("processing question for user" + parsedResponse.userId);

    if (language === "c++") {
      console.log("Running users c++ code");
      await new Promise((r) => setTimeout(r, 1000));
      continue;
    }
    if (language === "js") {
      const filePath = __dirname + "/code/a.js";
      console.log("Running user js code");
      fs.writeFileSync(filePath, code);
      const proc = spawn(["node", filePath], {
        stdout: "inherit",
        stderr: "inherit",
      });
      await proc.exited;
    }
    if (language === "py") {
      const filePath = __dirname + "/code/a.py";
      console.log("Running user python code");
      fs.writeFileSync(filePath, code);
      const proc = spawn(["python3", filePath], {
        stdout: "inherit",
        stderr: "inherit",
      });
      await proc.exited;
    }
  }
});
