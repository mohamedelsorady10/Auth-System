# Auth-System

A simple full-stack authentication project with a NestJS backend and a Vite + React frontend. This repository contains two folders: backend and frontend and demonstrates user signup, signin, and protected routes using JWTs.

Tech stack

- Backend: NestJS, TypeScript, JWT authentication
- Frontend: React + Vite, TypeScript

Repository structure

- backend : NestJS API server
  - src/auth : authentication module, controllers and strategies
  - src/users : user service and schema
- frontend/ : React + Vite single-page app
  - src/pages : Signin, Signup, Application pages
  - src/contexts/AuthContext.tsx : authentication context and helpers

Prerequisites

- Node.js 16+ (recommended)
- npm (or yarn)
- A MongoDB instance (local or remote) for the backend

Environment variables

Create an .env in the backend/ folder (or set system env vars):

- MONGO_URI — MongoDB connection string
- JWT_SECRET — secret used to sign JWTs
- PORT — (optional) backend port, default usually 3000

Create an .env (or use Vite env prefix) for the frontend/:

- VITE_API_URL — base URL for the backend API (e.g. http://localhost:3000)

Run locally

Backend (powershell):

```powershell
cd backend
npm install
npm run start:dev
```

Frontend (powershell):

```powershell
cd frontend
npm install
npm run dev
```

Notes:

- `start:dev` runs NestJS in watch mode (if available in `backend/package.json`).
- For production builds, run `npm run build` where applicable and follow each folder's README.

API (overview)

- POST /auth/signup — Create a new user (expects signup DTO)
- POST /auth/signin — Sign in (expects signin DTO), returns a JWT
- Protected endpoints require Authorization: Bearer <token> header

Check backend/src/auth and backend/src/common/guards/jwt-auth.guard.ts for implementation details.

Auth flow

- User signs up via the frontend; backend stores user and returns success.
- User signs in and receives a JWT token.
- Frontend stores the token (in memory, context, or secure storage) and sends it as `Bearer` header to protected API routes.

Testing

- If tests exist for either workspace, run them from the respective folder: `npm run test`.

Troubleshooting

- If the frontend cannot reach the API, confirm VITE_API_URL points to the running backend and check CORS configuration in the backend.
- If signin/signup fails, check backend logs in backend/logs/ (if available) and ensure MONGO_URI is correct.

Contributing

- Open an issue or PR to propose changes. Keep changes scoped to either backend/ or frontend/ unless refactoring both.

---

If you want, I can:

- Add a short backend/README.md and frontend/README.md with expanded run and build instructions.
- Add example .env.example files for both folders.

File: `README.md` created at repository root.
