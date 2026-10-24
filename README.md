# Aionys Technical Assignment

**Stack:** ASP.NET Core REST API (.NET 9), PostgreSQL, React + Vite, Zustand, react-i18next, Playwright.

## Requirements

- Docker with Docker Compose

Additionally, for local development (database in Docker, API and client run natively):
.NET 9 SDK and Node.js 22+.

## Quick start (Docker)

    cp .env.example .env
    docker compose up --build

`DB_USER`, `DB_PASSWORD` and `DB_NAME` are required. The values in `.env.example`
work out of the box and are meant for local use only; you can replace them with your own.
Use simple values (letters, digits, `_`, `-`): characters such as `;`, `$`, quotes or
spaces break the connection string and variable substitution.

- Client: http://localhost:3000
- API: http://localhost:5000
- Database migrations are applied automatically on API startup.

Optional variables (`BACKEND_PORT`, `FRONTEND_PORT`, `DB_PORT`) can be set in `.env`.
After changing the code or ports, rebuild with `--build`.
If you change `DB_USER`, `DB_PASSWORD` or `DB_NAME` after the first run, reset the volume:

    docker compose down -v

## API

| Method | Endpoint      | Description        |
|--------|---------------|--------------------|
| GET    | /notes        | Get all notes      |
| GET    | /notes/{id}   | Get specified note |
| POST   | /notes        | Create note        |
| PUT    | /notes/{id}   | Update note        |
| DELETE | /notes/{id}   | Delete note        |

## Local development

Start only the database (uses the values from your `.env`):

    docker compose up -d postgres

Set the connection string for the API using .NET user secrets. Replace the placeholders
in angle brackets with the values from your `.env` (`DB_PORT` is `5432` unless you changed it):

    cd backend/App.Api
    dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=<DB_PORT>;Database=<DB_NAME>;Username=<DB_USER>;Password=<DB_PASSWORD>"

For example, with the values from `.env.example`:

    dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=notes_db;Username=notes_user;Password=notes_password"

Run the API and the client:

    cd backend/App.Api
    dotnet run                  # http://localhost:5074

    cd frontend
    npm install
    npm run dev                 # http://localhost:5173

## E2E test

Requires Docker running. The test starts the whole stack itself.

    cp .env.example .env        # if not done yet
    cd frontend
    npm install
    npx playwright install chromium   # downloads the test browser (once)
    npm run test:e2e

If the stack is already running, the test reuses it (rebuild it with `--build` after code changes).
If you changed ports in `.env`, set `E2E_BASE_URL` and `E2E_API_URL`.

## Notes

- State management: Zustand holds the notes list; the home page loader fetches fresh data from the API.
- Localization: English / Ukrainian, the chosen language is persisted in localStorage.