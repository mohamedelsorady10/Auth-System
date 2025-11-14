# Authentication Frontend (React + TypeScript)

Friendly, production-ready authentication UI built with React, TypeScript, and Vite. It's a small app that shows typical authentication flows: signup, signin, protected pages, and simple JWT handling.

## Quick overview

- Sign up and sign in flows
- Protected routes guarded by an auth context
- JWT token handling (stored in localStorage)
- Axios setup with request/response interceptors
- Client-side validation and nice UX for errors


## Getting started

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file and update if needed:

```bash
cp .env.example .env
# Then edit .env and set VITE_API_URL if necessary
```

Default API URL in `.env.example` is:

```env
VITE_API_URL=http://localhost:3001/api
```

3. Run the app in development:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## What you'll find in the app

- `/signup` — Register a new account (client-side validation)
- `/signin` — Log in and receive a JWT
- `/app` — Example protected page that shows user info

Flows:

- After signing in, an `accessToken` is saved to `localStorage` and attached to requests.
- Protected routes check authentication state and redirect to `/signin` if not logged in.

## Validation rules (client-side)

- Email: valid email format
- Name: minimum 3 characters
- Password: minimum 8 characters, at least one letter, one number, and one special character (e.g. `Password123!`)

## API integration (expected endpoints)

The frontend expects the backend API under `VITE_API_URL` with the following endpoints:

- `POST /auth/signup` — create a new user
- `POST /auth/signin` — authenticate and return `{ accessToken, user }`
- `GET /auth/profile` — get the current user profile (requires Authorization header)

Axios is configured so requests automatically include the JWT when present. On 401 responses the app clears auth state and redirects to the sign-in page.

## Auth state

Auth state is managed with a React Context (`AuthContext`). The context exposes:

- `user` — the logged-in user's info or `null`
- `isAuthenticated` — boolean
- `isLoading` — boolean during async calls
- `signup`, `signin`, and `logout` methods

Auth data persisted to `localStorage`:

- `accessToken`
- `user`



## TypeScript types

```ts
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

interface SignupData { email: string; name: string; password: string }
interface SigninData { email: string; password: string }
```
