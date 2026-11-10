import "dotenv/config";
import { PrismaClient } from "@prisma/client";

/**
 * One shared PrismaClient for the whole back-end.
 * Repositories receive it (or use this default) instead of
 * creating a client per request.
 */
export const prisma = new PrismaClient();
