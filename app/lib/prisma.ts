import { PrismaClient } from "@prisma/client";

// Extend globalThis without using namespaces
// declare global {
//   interface GlobalThis {
//     prisma?: PrismaClient;
//   }
// }

// Use a global variable to prevent multiple instances in development
//const prisma = globalThis.prisma || new PrismaClient();
const prisma =  new PrismaClient();
// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = prisma;
// }

export default prisma;
