import { PrismaClient } from "@prisma/client";

let prisma;

// Singleton Pattern
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development mode, use a global instance to prevent connection limits
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
