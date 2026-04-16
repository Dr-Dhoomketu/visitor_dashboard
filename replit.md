# VMS Workspace

A pnpm monorepo migrated from Vercel to Replit.

## Architecture

- **`artifacts/api-server`** — Express 5 API server (TypeScript, Drizzle ORM, PostgreSQL)
- **`artifacts/vms-ui`** — React + Vite frontend (Tailwind CSS v4, shadcn/ui, TanStack Query)
- **`lib/db`** — Shared Drizzle ORM database schema and client
- **`lib/api-client-react`** — Generated API client for the frontend (React Query hooks)
- **`lib/api-spec`** — OpenAPI spec and orval codegen config
- **`lib/api-zod`** — Shared Zod schemas for API validation

## Running the App

The `Start application` workflow runs `start.sh` which:
1. Builds the API server (`artifacts/api-server`) with esbuild
2. Starts the API server on port **3001** (background)
3. Starts the Vite dev server on port **5000** (foreground, webview)

The Vite server proxies all `/api/*` requests to the API server on port 3001.

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (provisioned by Replit)
- `API_PORT` — Port for the API server (default: 3001)
- `PORT` — Port for the Vite UI (default: 5000)

## Package Manager

Uses **pnpm** with workspace protocol. Always use `pnpm` — the root `package.json` enforces this.

## Database

Uses Replit's built-in PostgreSQL via Drizzle ORM. Schema defined in `lib/db/src/schema/`.

To push schema changes:
```bash
cd lib/db && pnpm run push
```

## Build

```bash
pnpm run build  # typecheck + build all artifacts
```
