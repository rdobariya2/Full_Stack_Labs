# Pixell River back-end — Lab 4.1

Express + TypeScript API for Employee and Role data. See the Lab 4.1
`README.md` (one level up) for the full API table and how to run it.

## Layout (Route → Controller → Service → Repository)

```
src/
├── server.ts            # listens only
├── app.ts               # builds the Express app (helmet, CORS, JSON, routes, errors)
├── config/env.ts        # PORT, FRONTEND_ORIGINS allow-list
├── middleware/
│   ├── cors.ts          # only the front-end (+ no-Origin tools like Postman) may call the API
│   └── errorHandler.ts  # JSON errors: 400 / 403 / 404 / 500
├── models/              # Employee, Role (+ EmployeeWithRole) types
├── data/                # TEMPORARY in-memory data — employees.ts, roles.ts (no DB yet)
├── repositories/        # the ONLY layer that reads data/
├── services/            # business logic only
├── controllers/         # the ONLY layer that touches req/res
├── routes/              # URL mapping only
└── validation/          # Zod schemas for ids and query strings
```

## Scripts

```bash
npm install
npm run dev        # tsx watch src/server.ts — http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # tsc -> dist/
npm start          # node dist/server.js
```
