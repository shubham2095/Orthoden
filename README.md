# Orthoden Dental Clinic Website

Website for **Orthoden Multi Speciality Dental Clinic** (Mayur Vihar, Delhi): service pages, case gallery, testimonials, FAQ and an appointment request form that emails the clinic.

- **Client:** React 19, Vite, React Router, framer-motion
- **Server:** Express 5, Nodemailer (Gmail), express-rate-limit
- **Layout:** npm workspaces monorepo, so one install and one command run everything

## Project structure

```
Orthoden/
├── package.json          Root: workspaces + scripts (dev, build, start)
├── package-lock.json     Single lockfile for the whole repo
├── client/               React app (Vite)
│   ├── index.html
│   ├── vite.config.js    Dev server + /api proxy to the Express server
│   ├── public/           Static files and images
│   └── src/
│       ├── components/   Navbar, Footer, FAQ, Testimonials, FloatBtn, ScrollToTop
│       ├── pages/        Home, About, Services, Gallery, Contact, NotFound
│       └── utils/        Shared framer-motion animation variants
└── server/               Express API
    ├── index.js          App setup, CORS, rate-limited API, serves client/dist
    ├── routes/           Route definitions (contact.js)
    ├── controllers/      Request handlers (contactController.js)
    └── .env.example      Required environment variables
```

## Getting started

Requires Node.js 20.19+ or 22.12+ (needed by Vite 8).

```bash
# 1. Install dependencies for client and server (one command, from the repo root)
npm install

# 2. Create the server config
cp server/.env.example server/.env      # Windows PowerShell: Copy-Item server/.env.example server/.env
#    then fill in EMAIL_USER, EMAIL_PASS and EMAIL_TO

# 3. Run client and server together
npm run dev
```

`npm run dev` starts both processes in one terminal:

| Process | URL | Notes |
|---|---|---|
| Client (Vite) | http://localhost:5173 | Open this one. If the port is taken, Vite prints the next free one. |
| Server (Express) | http://localhost:5000 | Restarts on file changes. Vite proxies `/api` to it. |

Press `Ctrl+C` once to stop both.

## Scripts (run from the repo root)

| Command | What it does |
|---|---|
| `npm run dev` | Client and server together, with hot reload |
| `npm run build` | Builds the React app into `client/dist` |
| `npm start` | Starts the Express server, which serves `client/dist` and the API |
| `npm run preview` | Build, then start: a production-style run on one port |

To run one side only: `npm run dev -w client` or `npm run dev -w server`.

## Environment variables (`server/.env`)

| Variable | Required | Description |
|---|---|---|
| `EMAIL_USER` | yes | Gmail address that sends the emails |
| `EMAIL_PASS` | yes | Gmail **App Password** (not your normal password) |
| `EMAIL_TO` | yes | Inbox that receives appointment requests |
| `PORT` | no | Server port (default `5000`) |
| `TRUST_PROXY` | no | Set to `1` when deployed behind a reverse proxy, so the rate limit works per visitor |
| `CORS_ORIGIN` | no | Comma-separated list of sites allowed to call the API |

`server/.env` is git-ignored. Never commit it.

## Contact form API

`POST /api/contact` with JSON `{ name, phone, message, email?, service? }`.

- All input is validated and HTML-escaped before it goes into the email.
- Limited to 5 requests per IP every 15 minutes (responds `429` after that).
- Request bodies are capped at 10 KB.

## Deployment

1. `npm install`
2. `npm run build`
3. Set the environment variables above on your host (including `TRUST_PROXY=1` behind a proxy)
4. `npm start`

One Node process serves both the site and the API, so no extra web server is needed.
