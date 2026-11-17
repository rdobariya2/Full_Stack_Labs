const DEFAULT_ORIGINS = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
];

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Copy backend/.env.example to backend/.env and set it — see the Lab 5.1 README.md.",
  );
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL as string,
  clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY ?? "",
  clerkSecretKey: process.env.CLERK_SECRET_KEY ?? "",
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
