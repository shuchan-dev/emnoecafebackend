import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

export const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "error" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
  ],
});

prisma.$on("error", (e) => {
  logger.error(e);
});
prisma.$on("warn", (e) => {
  logger.warn(e);
});
prisma.$on("info", (e) => {
  logger.info(e);
});
prisma.$on("query", (e) => {
  logger.info(e);
});

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
