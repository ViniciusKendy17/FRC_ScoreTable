import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const hasValues = (obj: any) =>
  Object.values(obj).some((v) => v !== null && typeof v !== "undefined");
