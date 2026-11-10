# Lab 4.2 — Pixell River Financial: Database (Prisma + PostgreSQL)

Extends Lab 4.1. Same application, same API, same front-end — the
only change is where the data lives: in a real PostgreSQL database
instead of in-memory arrays.

```
Lab 4.2/
├── frontend/   # Static site (HTML/CSS/JS). Unchanged from Lab 4.1.
└── backend/    # Express + TypeScript + Prisma/PostgreSQL API.
```

**Branch:** this lab lives on the `fs_lab-4.2` branch, not on `main`.
`main` still has Lab 4.1 only. Merge this branch into `main` when
you are ready to submit Lab 4.2 (only `main` is assessed).

## What changed in Lab 4.2

- **Database added** — PostgreSQL 16, via Docker locally
  (`backend/docker-compose.yml`, `postgres:16-alpine`, database
  `pixell_river`, port `5432`). No Docker on this machine? Install
  Docker Desktop, then `docker compose up -d` from `backend/`.
- **Connected via environment variables** — the back-end reads
  `DATABASE_URL` from `backend/.env` (see `.env.example`). It is
  never hard-coded and never committed. `backend/.env` is git-ignored.
- **Prisma schema** (`backend/prisma/schema.prisma`) for Employees
  and Roles, replacing the Lab 4.1 in-memory data:
  - `Department` — `id`, `name` (unique). 5 rows.
  - `Role` — `id`, `title` (unique), `description`, `category`
    (enum: `Executive`, `Management`, `ITS_Security`). 22 rows.
  - `Employee` — `id`, `firstName`, `lastName`, `departmentId`,
    `roleId` (foreign keys). 16 rows.
- **Normalized to at least 3NF** — see the comments in
  `prisma/schema.prisma`:
  - 1NF: every column is a single atomic value; `fullName` is not
    stored, it is derived in the service from `firstName` + `lastName`.
  - 2NF: single-column primary keys, so every non-key column depends
    on the whole key.
  - 3NF: no non-key column depends on another non-key column.
    Department names live only in `Department`, role title /
    description / category live only in `Role`; `Employee` stores
    only the two foreign keys.
- **Migration** — `backend/prisma/migrations/20261110000000_init/`
  creates the three tables, the `RoleCategory` enum, unique
  indexes and foreign keys. Apply it with
  `npx prisma migrate deploy` (or `npm run db:migrate` locally).
- **Seed** — `backend/prisma/seed.ts` (`npm run db:seed`) inserts
  all the data previously stored locally: the 5 departments and
  16 employees from `employees_dept.json`, and the 22 roles from
  Appendix B of the case study. It is idempotent — running it twice
  does not duplicate rows.
- **Repositories now use Prisma** — `EmployeeRepository` and
  `RoleRepository` are the only files that touch the database.
  Services and controllers only changed to `async`/`await`; routes,
  validation, CORS and the API responses are unchanged.
- **Front-end unchanged** — it still fetches from the same API, so
  the same page now renders database-backed data with no code change.

## Vercel / Neon (hosted database)

This part needs your own Vercel and Neon accounts — I cannot create
them for you, and no Neon credentials are in this repo.

1. In Vercel, open your project (or create one from this repo),
   go to **Integrations**, add **Neon Postgres**, and create a
   database. Vercel will add `DATABASE_URL` to the project's
   Environment Variables.
2. In Vercel, set the project's **Build Command** to run the
   migration and seed on deploy if your course requires it, or run
   them once from your machine against Neon:
   ```bash
   # in backend/, with a local .env pointing at Neon:
   npm run db:deploy
   npm run db:seed
   ```
   Neon URLs need `?sslmode=require` — see `.env.example`.
3. Deploy. The back-end reads `DATABASE_URL` from Vercel's
   environment variables, exactly as it reads it from `.env` locally.
   No code change is needed to switch from local Docker to Neon —
   only the `DATABASE_URL` value changes.

## API

Unchanged from Lab 4.1. Base URL: `http://localhost:3000`

| Method | Route | Description |
|---|---|---|
| GET | `/health` | `{ "status": "ok" }` |
| GET | `/api/employees` | All 16 employees. Optional `?department=` and `?roleId=` filters. |
| GET | `/api/employees/:id` | One employee, e.g. `/api/employees/emp-01`. |
| GET | `/api/roles` | All 22 roles from Appendix B. |
| GET | `/api/roles/:id` | One role, e.g. `/api/roles/role-ceo`. |

## Run it (local Docker)

```bash
# 1. Database (terminal 1, from backend/)
cd backend
cp .env.example .env
docker compose up -d
npm install
npx prisma migrate deploy   # or: npm run db:migrate
npm run db:seed             # 5 departments, 22 roles, 16 employees

# 2. Back-end (same terminal, after the DB is up)
npm run dev                 # http://localhost:3000

# 3. Front-end (terminal 2)
cd ../frontend
npx serve . -l 5500
# then open http://localhost:5500
```

Stop the database with `docker compose down` from `backend/`
(add `-v` only if you want to delete the data).

## Quick checks (with the back-end running)

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/employees
curl "http://localhost:3000/api/employees?department=Information%20Technology"
curl http://localhost:3000/api/employees/emp-04
curl http://localhost:3000/api/roles
curl http://localhost:3000/api/roles/role-ceo
curl http://localhost:3000/api/employees/emp-99        # 404
curl http://localhost:3000/api/employees/bad-id       # 400
```
