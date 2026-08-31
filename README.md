# GHL Prime — Project Management (Frontend)

Next.js dashboard for the Ops Command Center: a drag-and-drop task board, per-assignee time tracking, live reports with Excel export, project and client management, and a password vault.

Talks to **[GHL-Prime-Project-Management-Backend](https://github.com/vibeteamoctopidigital/GHL-Prime-Project-Management-Backend)** over REST.

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + React Compiler |
| Styling | Tailwind CSS 4 |
| Server state | TanStack Query 5 |
| Client state | Redux Toolkit |
| Icons / motion | lucide-react, framer-motion |
| Toasts | sonner |
| Export | exceljs (XLSX), html-to-image (PNG) |

---

## Getting started

The backend must be running first — this app is a pure client of it.

```bash
# 1. install
pnpm install

# 2. configure
echo 'NEXT_PUBLIC_API_URL=http://localhost:4000/api' > .env.local

# 3. run
pnpm dev          # http://localhost:3000
```

Log in with an account seeded by the backend (`pnpm db:seed` there).

---

## Environment variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | | `http://localhost:4000/api` | Backend base URL. **Must include `/api`** |

`NEXT_PUBLIC_*` variables are **inlined into the browser bundle** — never put a secret in one. **Never commit `.env*`** (gitignored — SOP §7).

Make sure the backend's `CORS_ORIGINS` includes this app's origin.

---

## Scripts

| Command | Does |
|---|---|
| `pnpm dev` | Dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |

---

## Project structure

```
src/
  app/                    App Router routes (see below)
  components/             Shared UI — Sidebar, TaskCard, KanbanColumn, modals
  features/<domain>/      Domain slices: components + lib + types
  hooks/queries/          One TanStack Query hook per resource
  lib/
    api/                  Typed client: client.ts + resources/*
    query/                QueryClient config and query keys
    types.ts              Shared domain types and enums
  store/                  Redux store and slices
  providers/              App-wide providers
```

### Routes

`/login` · `/` · `/board` · `/daily` · `/projects` · `/projects/[id]` · `/reports` · `/clients` · `/subscriptions` · `/team-members` · `/password-vault` · `/profile` · `/dashboard` · `/admin/tasks` · `/admin/users` · `/admin/activity`

Sidebar entries are role-filtered in `components/_sidebarComponents/constants.tsx`.

---

## Architecture notes

**Server state vs client state.** TanStack Query owns everything fetched from the API (cache, dedupe, background refetch). Redux owns only client state — auth session, board filters, admin form state. Don't duplicate server data into Redux.

**All data access goes through `lib/api`.** Never call `fetch` directly from a component. `apiFetch` attaches the JWT, normalises errors to `{ error }`, and keeps request shapes in one place.

**Live updates use polling.** `subscribeToChanges` re-runs a callback on an interval (8s default) and pauses while the tab is hidden. Swap its internals for SSE/WebSocket later without touching call sites.

**Dates are interpreted in the browser's timezone.** `log_date` is date-only; the board and reports render it with `toLocaleDateString('en-CA')`. The API does row selection only — keep date bucketing on the client so days don't shift for users in other timezones.

**Heavy libraries are lazy-loaded.** `exceljs` and `html-to-image` are `await import()`-ed inside their click handlers so they never enter the main bundle. Keep it that way when adding export features.

**Memoised tables.** `ReportsTable`, `ProjectTable`, `AdminTaskTable`, `KanbanColumn` and `TaskCard` use `memo()` with custom comparators that compare *data* props and deliberately ignore inline callbacks — otherwise every poll re-renders the whole table. If you add a prop that affects rendering, add it to the comparator.

---

## Domain rules worth knowing

- **Two statuses per task.** `Task.status` (shared/central) and `TaskAssignment.status` (per assignee). Boards show `assignment_status || status`. For single-assignee tasks the backend keeps both in sync.
- **Completed + logged time is locked.** Such a task can't be moved or deleted; the UI disables the controls and shows why, mirroring the server rule.
- **Hour logging requires `Complete`.** The working-hour and logged-time inputs only apply once a task is Complete.
- **Leads see only their own team.** Scoping is enforced server-side, so a Lead's board and reports contain only themselves plus Members they created.

---

## Contributing

Follow the **Octopi Git & GitHub Development SOP**:

- Branch: `<type>/<issue-number>-<short-description>` — e.g. `feat/42-report-filters`
- Commit: `<type>(<scope>): <description>` — e.g. `fix(board): keep optimistic status through poll`
- Types: `feat` `fix` `hotfix` `refactor` `chore` `docs` `test`
- **Never** push directly to `main`, `dev`, or `staging` — PR only, 1+ approval, author cannot self-approve
- Flow: feature branch → PR → `dev` → QA/staging → PR → `main`
- Never commit `.env*` or anything secret

Before opening a PR:

```bash
pnpm lint
pnpm build
```

---

## Deployment

Standard Next.js build. Set `NEXT_PUBLIC_API_URL` to the deployed backend (including `/api`) **at build time** — `NEXT_PUBLIC_*` values are baked into the bundle, so changing it later requires a rebuild.

```bash
pnpm install
pnpm build
pnpm start
```

Add the deployed origin to the backend's `CORS_ORIGINS`.
