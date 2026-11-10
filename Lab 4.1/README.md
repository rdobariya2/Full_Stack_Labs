# Lab 4.1 — Pixell River Financial: Back-End (Express + TypeScript)

Extends Labs 1.1–3.2. The application is now split into a front-end
and a back-end in a monorepository:

```
Lab 4.1/
├── frontend/   # Static site (HTML/CSS/JS). No local Employee/Role data.
└── backend/    # Express + TypeScript API. Owns all Employee and Role data.
```

## What changed in Lab 4.1

- **Back-end created** (`backend/`, Express + TypeScript) following the
  **Route → Controller → Service → Repository** pattern:
  - `src/routes/` — URL mapping only (`GET /api/employees`, `GET /api/employees/:id`,
    `GET /api/roles`, `GET /api/roles/:id`).
  - `src/controllers/` — the only layer that touches `req`/`res`; validates
    input, calls the service, shapes the JSON response.
  - `src/services/` — business logic only (e.g. resolving an employee's
    role title, rejecting an unknown `roleId` filter with 400).
  - `src/repositories/` — the only layer that touches the data source.
  - `src/validation/` — Zod schemas for ids and query strings.
  - `src/data/` — temporary in-memory data (see below).
- **No database yet.** As instructed, the repositories use the same
  temporary data as before: the 16 employees in the same 5 departments
  from `employees_dept.json`, flattened to a list, plus Roles taken from
  Appendix B of the Pixell River case study (each employee gets a
  `roleId`; the role assignments are this lab's reasonable mapping by
  department — the case study does not give a role for these 16 names).
  The next lab swaps the repositories for a database; services and
  controllers do not need to change.
- **Only the routes the front-end needs exist.** The front-end is
  read-only (it lists employees grouped by department), so there are
  deliberately **no POST / PUT / PATCH / DELETE routes** in this lab.
- **Requests are only accepted from the front-end** (and dev tools):
  CORS allows only the origins in `backend/.env` / `FRONTEND_ORIGINS`
  (default: `http://localhost:5500`, `http://127.0.0.1:5500`,
  `http://localhost:5173`, `http://localhost:8080`, `http://localhost:3000`).
  Requests with no `Origin` header (curl, Postman) are allowed.
  Any other browser origin gets `403 Forbidden`. See
  `backend/src/middleware/cors.ts` — note that CORS is browser
  enforcement, not authentication, and is not claimed to be more.
- **Front-end refactored** (`frontend/`): `script.js` fetching the local
  `employees_dept.json` is gone. `js/repositories/employeeRepository.js`
  and `js/repositories/roleRepository.js` fetch from the API and
  `js/app.js` renders the same directory, grouped by department, now
  with each person's role title. The API address is the single value in
  `js/config.js`. The original `employees_dept.json` is kept only as
  `frontend/employees_dept.json.ORIGINAL-LAB-1.1.txt` for reference —
  the app does not load it.

> Note: the files in `Lab 1.1/` on GitHub `main` are 0-byte placeholders.
> Lab 4.1 was built from the Lab 1.1 files supplied with this submission
> (the working `index.html` / `script.js` / `styles.css` /
> `employees_dept.json`).

## API

Base URL: `http://localhost:3000`

| Method | Route | Description |
|---|---|---|
| GET | `/health` | `{ "status": "ok" }` |
| GET | `/api/employees` | All 16 employees. Optional `?department=` and `?roleId=` filters. |
| GET | `/api/employees/:id` | One employee, e.g. `/api/employees/emp-01`. Id must match `emp-NN`. |
| GET | `/api/roles` | All 22 roles from Appendix B. |
| GET | `/api/roles/:id` | One role, e.g. `/api/roles/role-ceo`. |

List responses: `{ "data": [...], "count": n }`. Single responses: `{ "data": {...} }`.
Errors: `{ "error": { "message": "..." } }` — `400` for invalid
ids/query strings (including an unknown `roleId` filter or unknown
query parameter), `404` for an unknown id or route, `403` for a
disallowed origin.

Employees are returned with `fullName` and `roleTitle` resolved, e.g.:

```json
{ "data": { "id": "emp-01", "firstName": "Eleanor", "lastName": "Vance",
  "department": "Executive & Administration", "roleId": "role-ceo",
  "fullName": "Eleanor Vance", "roleTitle": "CEO/Chair of Board" } }
```

## Run it

```bash
# 1. Back-end (terminal 1) — http://localhost:3000
cd backend
cp .env.example .env   # optional; defaults already work locally
npm install
npm run dev            # or: npm run build && npm start

# 2. Front-end (terminal 2) — serve the static folder, e.g.:
cd ../frontend
npx serve . -l 5500
# or: python3 -m http.server 5500
# then open http://localhost:5500
```

> Open `index.html` directly with `file://` will not work: browsers
> block `fetch()` to `http://localhost:3000` from a `file://` page
> (and the back-end's CORS allow-list would not match it). Serve the
> front-end over HTTP as above.

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
curl http://localhost:3000/api/employees?bogus=1       # 400
# Disallowed origin (browser-style request):
curl -H "Origin: https://evil.example.com" -i http://localhost:3000/api/employees  # 403
```
