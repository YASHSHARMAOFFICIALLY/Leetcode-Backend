import { prisma } from "../../db";
import { client } from "../../db/redis";

export const submission = async (language: string, code: string) => {
  const response = await prisma.submission.create({
    data: { language, code, status: "Procession" },
  });
  await client.lPush(
    "problems",
    JSON.stringify({ submissionId: response.id, code, language }),
  );
  return {
    message: "processing",
    id: response.id,
  };
};
