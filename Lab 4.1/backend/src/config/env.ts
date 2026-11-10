/**
 * Environment config. No secrets are needed for Lab 4.1.
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

export const env = {
  port: Number(process.env.PORT ?? 3000),
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
