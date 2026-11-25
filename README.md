# Orthoden Dental Clinic Website

Website for **Orthoden Multi Speciality Dental Clinic** (Mayur Vihar, Delhi): services, case gallery, testimonials, FAQ and an appointment request form that emails the clinic.

It is one Node.js app: an Express server that serves the API **and** the built React website. There is no database.

## Tech stack

- **Frontend:** React 19 (Vite), React Router, Framer Motion, React Icons
- **Backend:** Node.js 20.19+, Express 5, Nodemailer (Gmail)
- **Security:** helmet, rate limiting, zod validation, HTML-escaped emails
- **Tooling:** oxlint, concurrently

## Folder structure

```
.
├── client/                    React website (Vite)
│   ├── public/                favicon, images/{brand,home,gallery,clinic}
│   └── src/
│       ├── App.jsx            Root component
│       ├── PublicSite.jsx     Layout + all routes
│       ├── components/        layout/ (Navbar, Footer, FloatingContact, ScrollToTop)
│       │                      common/ (FAQ, Testimonials, PageTransition)
│       ├── pages/public/      Home, About, Services, Gallery, Contact, NotFound (each with its .css)
│       ├── services/          API helpers (api.js, contactService.js)
│       └── utils/             Shared animation variants
├── server/
│   ├── server.js              Entry file
│   ├── routes/                index.js + one file per resource (contactRoutes.js)
│   ├── controllers/           Request handlers (contact, seo)
│   ├── middleware/            rateLimit, validate, errorHandler
│   ├── schemas/               zod schemas (contactSchema.js)
│   └── services/              mailService.js
├── .env.example               Every environment variable, with comments
└── package.json               Backend dependencies and all scripts
```

## Run it locally

1. Install everything (the root install also installs the client):

   ```bash
   npm install
   ```

2. Create your environment file: copy `.env.example` to `.env` (project root) and fill in the values.

   ```powershell
   Copy-Item .env.example .env
   ```

3. Start the website and the server together:

   ```bash
   npm run dev
   ```

   - Website: <http://localhost:5173> (Vite reloads as you edit; if the port is busy it prints the next free one)
   - API server: <http://localhost:5000> (restarts when you edit `server/`)

   Vite forwards `/api` calls to the server, so the contact form works in development. Press `Ctrl+C` once to stop both.

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Website and server together, with reload |
| `npm run dev:server` | Server only |
| `npm run dev --prefix client` | Website only |
| `npm run build` | Builds the website into `client/dist` |
| `npm start` | Runs the server (serves `client/dist` and the API) |
| `npm run lint` | Lints the client with oxlint |

To try the production setup locally: `npm run build`, then `npm start`, then open <http://localhost:5000>.

## Environment variables (`.env`)

| Variable | Required | Description |
| --- | --- | --- |
| `EMAIL_USER` | yes | Gmail address that sends the emails |
| `EMAIL_PASS` | yes | Gmail **App Password** (not your normal password) |
| `EMAIL_TO` | yes | Inbox that receives appointment requests |
| `PORT` | no | Server port (default `5000`) |
| `SITE_URL` | no | Public address of the site, used in `sitemap.xml` and `robots.txt` |
| `NODE_ENV` | no | `production` on the live site |
| `TRUST_PROXY` | no | Number of reverse proxies in front of the app (default `1` in production). Keeps the rate limit per visitor. |

`.env` is git-ignored. Never commit it.

## API

| Route | Description |
| --- | --- |
| `GET /api/health` | Returns `{ "status": "ok" }` |
| `POST /api/contact` | Appointment request: `{ name, phone, message, email?, service? }` |
| `GET /sitemap.xml`, `GET /robots.txt` | Built from `SITE_URL` |

The contact route validates input with zod, HTML-escapes everything before it goes into the email, allows 5 requests per IP every 15 minutes (then `429`), and rejects bodies over 10 KB.

## Deployment

1. Set the environment variables on your host (`NODE_ENV=production`, `SITE_URL`, the three `EMAIL_*` values).
2. `npm install`
3. `npm run build`
4. `npm start`

One Node process serves both the site and the API, so no extra web server is needed.
