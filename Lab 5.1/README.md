# Lab 5.1 - Pixell River Financial: User Auth with Clerk

Extends Lab 4.2. Same app, same database, plus sign-in with
Clerk. Anyone can view the directory. Only signed-in users can
add entries.

This lab is on the `fs_lab-5.1` branch, not on `main`. Main still
has Lab 4.1 only. Merge into `main` when ready to submit, since
only `main` is assessed. The submission also needs a link to the
Vercel deployment of the front-end.

## What changed

- Clerk is installed and set up on both sides:
  - Back-end: `@clerk/express`. `clerkMiddleware()` runs when
    `CLERK_SECRET_KEY` is set in `backend/.env`.
  - Front-end: the Clerk JS SDK loads from the CDN in
    `frontend/js/auth.js`, using the publishable key in
    `frontend/js/config.js`.
- Log in / log out is on the navigation, on both pages.
- Two pages now: `index.html` (Employees) and `roles.html`
  (Roles), with a link between them in the navigation.
- Entry forms, one on each page:
  - Employees page: add an employee (first name, last name,
    department, role).
  - Roles page: add a role (title, description, category).
  - When not logged in, each form is replaced by a small box
    with a link to log in.
- New POST routes, both need a signed-in user:
  - POST `/api/employees` - creates an employee, returns 201.
    The id is the next `emp-NN`.
  - POST `/api/roles` - creates a role, returns 201. The id is
    built from the title, e.g. `role-vp-operations`.
  - A POST without a valid session token gets 401. GET routes
    are unchanged and stay open.
- The front-end sends the Clerk session token as a
  `Bearer` token on every POST.

## Clerk keys

Create an application in the Clerk Dashboard (free plan) and
copy the keys from its API keys page:

- Back-end: put `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
  in `backend/.env` (see `.env.example`). Never commit them.
- Front-end: put the publishable key in
  `frontend/js/config.js` as `CLERK_PUBLISHABLE_KEY`.

Without the keys, the app still runs and shows the directory,
but sign-in stays off and POSTs answer 401.

## API

Base URL: `http://localhost:3000`

- GET `/health` - `{ "status": "ok" }`
- GET `/api/employees` - all 16 employees, optional
  `?department=` and `?roleId=` filters
- GET `/api/employees/:id` - one employee
- POST `/api/employees` - signed-in users only
- GET `/api/roles` - all 22 roles
- GET `/api/roles/:id` - one role
- POST `/api/roles` - signed-in users only

## Run it

```bash
cd backend
cp .env.example .env
# put DATABASE_URL and the Clerk keys in .env, then:
docker compose up -d
npm install
npm run db:deploy
npm run db:seed
npm run dev
```

Front-end, in a second terminal:

```bash
cd ../frontend
npx serve . -l 5500
```

Then open http://localhost:5500 (Employees) or
http://localhost:5500/roles.html (Roles).

## Quick checks

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/employees
curl http://localhost:3000/api/roles
# no token, should be 401:
curl -X POST http://localhost:3000/api/employees -H "Content-Type: application/json" -d '{"firstName":"Test","lastName":"User","department":"Information Technology","roleId":"role-network-admin"}'
```
