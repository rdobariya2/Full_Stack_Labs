/**
 * Environment config.
 * DATABASE_URL is required in Lab 4.2 — it is how the back-end
 * connects to PostgreSQL (local Docker, or Neon on Vercel).
 * It is read from the environment, never hard-coded, and never
 * committed: put it in backend/.env (see .env.example).
 * FRONTEND_ORIGINS is the allow-list enforced by the CORS middleware:
 * only the front-end (and tools with no Origin header, e.g. Postman)
 * may call this API.
 */
const DEFAULT_ORIGINS = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
];

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Copy backend/.env.example to backend/.env and set it — see Lab 4.2 README.md.",
  );
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL as string,
  frontendOrigins: (process.env.FRONTEND_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean).length
    ? (process.env.FRONTEND_ORIGINS as string)
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean)
    : DEFAULT_ORIGINS,
};
