# Pixell River back-end - Lab 5.1

Express + TypeScript + Prisma (PostgreSQL) API for Employee and
Role data, with Clerk auth on POST routes. See the Lab 5.1
`README.md` one level up for the full API and how to run it.

Lab 4.2 added the database. Lab 5.1 adds sign-in: `clerkMiddleware()`
runs in `app.ts` when the Clerk keys are set, and the new
`middleware/auth.ts` returns 401 for POSTs without a signed-in
user. GET routes stay open.

Layout: Route -> Controller -> Service -> Repository.

- `src/server.ts` - loads .env and starts the server
- `src/app.ts` - builds the Express app
- `src/config/env.ts` - PORT, DATABASE_URL, FRONTEND_ORIGINS
- `src/lib/prisma.ts` - one shared PrismaClient
- `src/middleware/` - CORS and error handler
- `src/models/` - Employee and Role types
- `src/repositories/` - the only layer that talks to the database
- `src/services/` - business logic
- `src/controllers/` - handles req/res
- `src/routes/` - URL mapping
- `src/validation/` - Zod schemas
- `prisma/schema.prisma` - Department / Role / Employee, 3NF
- `prisma/seed.ts` - seeds 5 departments, 22 roles, 16 employees
- `prisma/migrations/` - migration files
- `docker-compose.yml` - local Postgres 16 (Docker)

## Scripts

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
npm start

npm run db:migrate # create/apply a migration (local DB)
npm run db:deploy  # apply migrations (Neon, CI)
npm run db:seed    # 5 departments, 22 roles, 16 employees
npm run db:studio  # browse the tables in a browser
```
