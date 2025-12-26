import "dotenv/config";
config()
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from "dotenv";

const connectionString =process.env.DATABASE_URL
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}
console.log("🔗 Connecting to database...", connectionString);
const adapter = new PrismaPg({ connectionString })
export const prismaClient = new PrismaClient({adapter})