# SATM Auth Server

Minimal Express auth server supporting:
- Email/password signup & login (bcrypt + JWT)
- Google OAuth (Passport) basic endpoints
- Admin flag on users

Setup

1. Install dependencies

```bash
cd server
npm install
```

2. Copy and edit environment

```bash
copy .env.example .env
# then edit .env to add JWT_SECRET and Google credentials
```

3. Run server

```bash
npm run dev
```

API endpoints

- `POST /auth/signup` { email, password, name } -> { token }
- `POST /auth/login` { email, password } -> { token }
- `GET /auth/google` -> redirects to Google
- `GET /auth/google/callback` -> Google callback
- `GET /me` -> require header `Authorization: Bearer <token>` -> current user

Admin user

To create an admin account manually, use sqlite CLI or a tiny script to set `isAdmin` to 1 for a user in `data.sqlite`.
