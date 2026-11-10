import "dotenv/config";
import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`Pixell River back-end listening on http://localhost:${env.port}`);
  console.log(`Allowed front-end origins: ${env.frontendOrigins.join(", ")}`);
  console.log(`Try: curl http://localhost:${env.port}/api/employees`);
});

// Close the Prisma connection pool cleanly on shutdown.
async function shutdown(signal: string): Promise<void> {
  console.log(`\n${signal} received, shutting down...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
