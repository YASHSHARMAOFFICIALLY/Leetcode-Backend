import { prisma } from "../../db";

// select excludes password — never return the hash to a client.
export const getById = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  });
