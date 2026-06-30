import z from "zod";

export const submissionSchema = z.object({
  code: z.string(),
  language: z.string(),
});
