# Pixell River back-end — Lab 4.2

Express + TypeScript + Prisma (PostgreSQL) API for Employee and Role
data. See the Lab 4.2 `README.md` (one level up) for the full API
table and how to run it.

Lab 4.1 used in-memory arrays. Lab 4.2 replaces them with a real
PostgreSQL database — the repositories are the only layer that
changed how it reads data; routes, controllers, services and the
front-end API are unchanged.

## Layout (Route → Controller → Service → Repository)

```
src/
├── server.ts            # loads .env, listens, disconnects Prisma on shutdown
├── app.ts               # builds the Express app (helmet, CORS, JSON, routes, errors)
├── config/env.ts        # PORT, DATABASE_URL (required), FRONTEND_ORIGINS
├── lib/prisma.ts        # one shared PrismaClient
├── middleware/
│   ├── cors.ts          # only the front-end (+ no-Origin tools like Postman) may call the API
│   └── errorHandler.ts  # JSON errors: 400 / 403 / 404 / 500
├── models/              # Employee, Role (+ EmployeeWithRole) types
├── repositories/        # the ONLY layer that talks to the database (Prisma)
├── services/            # business logic only (now async)
├── controllers/         # the ONLY layer that touches req/res (now async)
├── routes/              # URL mapping only
└── validation/          # Zod schemas for ids and query strings

prisma/
├── schema.prisma        # Department / Role / Employee, 3NF (see comments there)
├── seed.ts              # seeds 5 departments, 22 roles, 16 employees
└── migrations/
    └── 20261110000000_init/migration.sql
docker-compose.yml       # local Postgres 16 (Docker)
```

## Scripts

```bash
npm install
npm run dev        # tsx watch src/server.ts — http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # prisma generate && tsc -> dist/
npm start          # node dist/server.js

# Database
npm run db:migrate  # prisma migrate dev — create/apply a migration (local DB)
npm run db:deploy   # prisma migrate deploy — apply migrations (Vercel/Neon, CI)
npm run db:seed     # prisma db seed — 5 departments, 22 roles, 16 employees
npm run db:studio   # prisma studio — browse the tables in a browser
```
