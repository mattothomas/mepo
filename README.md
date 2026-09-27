# MEPO

Mentoring and orientation web application for Penn State students, mentors, and program staff.

## Current milestone

The frontend prototype is being connected to Supabase. The repository now includes:

- Supabase project and environment foundation
- initial profile/program/cohort/membership migration
- baseline Row Level Security policies
- CI, PR template, roadmap, ownership, and a point-estimated backlog

Authentication UI and dashboard feature data are still mocked on this branch. They will be migrated in later pull requests, one vertical slice at a time.

## Local application

Requirements: Node.js 22+ and npm.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Set these browser-safe values in `.env.local`:

```text
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

Never add a Supabase service-role/secret key to a `VITE_*` variable. Vite exposes those variables to the browser.

## Local Supabase

The Supabase CLI uses Docker for the local stack:

```sh
npm run db:start
npm run db:reset
npm run db:lint
```

Local Auth is configured as invite-only. Seed data intentionally contains no real student records.

## Verification

```sh
npm run format:check
npm run typecheck
npm run build
```

## Project documentation

- [Detailed implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Product roadmap](docs/PRODUCT_ROADMAP.md)
- [Point-estimated backlog](docs/BACKLOG.csv)
- [Team ownership](docs/OWNERSHIP.md)
- [GitLens and PR workflow](docs/GITLENS_AND_PR_WORKFLOW.md)

## Hosted Supabase setup still required

1. Create separate staging and production projects.
2. Disable public sign-up in each hosted project's Auth settings.
3. Configure exact localhost, staging, and production redirect URLs.
4. Link the CLI to staging and apply reviewed migrations.
5. Generate and commit database types from the deployed schema.
6. Invite test accounts through a trusted admin workflow.
7. Add only the project URL and publishable key to local/hosting environment settings.
8. Run the RLS abuse matrix before importing any real data.

Penn State SSO remains disabled until the institution's identity-provider access and claims are approved.
