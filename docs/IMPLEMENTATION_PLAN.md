# MEPO Implementation Plan

Status: active planning baseline  
Primary branch: `Caleb-Auth-DB`  
Repository: `mattothomas/mepo`

## 1. Outcome

Deliver a secure, testable MEPO web application in vertical slices. The first milestone is not "all screens connected." It is a reproducible platform in which an invited user can authenticate, the database assigns their role, protected routes and PostgreSQL enforce that role, and no account can read another account's protected data.

After that milestone, migrate one workflow at a time from hard-coded arrays to schema + RLS + typed query + complete UI states + tests.

## 2. Current-state audit

- React 19, React Router 7, TypeScript, Vite 8, and Tailwind CSS 4.
- Canonical application source is under `src/`; duplicate root-level `.tsx` files are legacy artifacts and should be handled in a separate cleanup PR.
- Login accepts any credentials and lets the browser select `mentee`, `mentor`, or `admin`.
- Every dashboard route is public.
- `AppShell` infers authorization from the URL, exposes a demo role switcher, hard-codes identity, and does not sign out a real session.
- Feature records live in component constants and disappear on refresh.
- There are no API, database, RLS policies, storage rules, tests, CI checks, or deployment environments.
- The branch is `Caleb-Auth-DB`; `main` is the remote default.
- `settings.png` is an unrelated untracked user file and must not be included in this work.

## 3. Non-negotiable security rules

1. Browser-selected roles are never trusted.
2. Authorization lives in PostgreSQL RLS; route guards are only UX.
3. The service-role/secret key is never placed in a `VITE_*` variable or browser bundle.
4. All real environments use invite-only onboarding until an approved SSO provider exists.
5. Every exposed table has RLS enabled before it contains real data.
6. All student-data access is least privilege, logged where appropriate, and tested with negative cases.
7. Staging and production are separate Supabase projects.
8. Schema changes are versioned migrations and include generated TypeScript types.
9. No production student data is copied into local development or screenshots.
10. AI, SMS, recording, location, and scraping require separate privacy/operations approval.

Supabase references:

- Auth: https://supabase.com/docs/guides/auth
- React Auth quickstart: https://supabase.com/docs/guides/auth/quickstarts/react
- RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- CLI workflow: https://supabase.com/docs/guides/local-development/cli-workflows
- Migrations: https://supabase.com/docs/guides/deployment/database-migrations
- Generated types: https://supabase.com/docs/guides/api/rest/generating-types

## 4. Architecture decisions

### 4.1 Authentication

Start with invite-only email/password accounts restricted by the trusted invitation process to approved addresses. Public sign-up remains disabled. Magic links may be substituted if the team wants passwordless access.

Penn State SSO is a later integration gate. The team must first confirm the institution's identity provider, claims, approval process, and Supabase plan requirements. A matching `@psu.edu` domain is not equivalent to institutional SSO.

### 4.2 Authorization

Use program-scoped membership because MEPO already models terms such as Fall 2026 and will eventually have multiple cohorts/years.

Roles:

- `mentee`
- `mentor`
- `coordinator`
- `admin`

The authoritative role is `program_memberships.role`. It is not client-editable profile metadata.

### 4.3 Environments

- Local Supabase for migrations, seed data, RLS tests, and development.
- Hosted staging project for integration/acceptance testing.
- Hosted production project for approved releases only.

Each environment has separate URLs, keys, redirect allowlists, storage, data, and backups.

### 4.4 Frontend data layer

- One typed Supabase browser client.
- One `AuthProvider` responsible for session, user, profile, current membership, loading, and errors.
- Route guards for signed-in state and expected roles.
- Small feature data modules/hooks rather than database queries scattered through JSX.
- Consider a query cache only after the initial flows establish real requirements.

## 5. Initial database model

Use UUID primary keys, `timestamptz`, explicit foreign keys, appropriate unique/check constraints, and indexes on policy/join columns.

### `profiles`

One-to-one with `auth.users`. Contains names and user-editable identity/contact fields, never the authoritative role.

### `programs`

Program term, lifecycle status, start/end dates, and mentor reveal timestamp.

### `cohorts`

Program-specific cohorts and display metadata.

### `program_memberships`

Authoritative mapping of user to program, role, cohort, and active status. Unique by program/user.

### `mentor_assignments`

Program, mentor, mentee, assignment dates, creator, and active/inactive state. Enforce only one active mentor assignment per mentee when that is the business rule.

### `call_attempts`

Assignment, attempt number, outcome, occurrence/follow-up times, notes, note visibility, and author.

### `events`

Program, phase, title, description, location, times, required flag, and creator.

### `attendance_records`

Event/user status, check-in/out times, source, recorder, and exception note. Unique by event/user.

### `tasks` and `task_assignments`

Task definition/audience and per-user state/completion.

### `announcements`

Program, author, audience targeting, publish/expiry times, title, and body.

### `notification_preferences`

Per-user choices corresponding to the current Settings toggles.

### `import_jobs` and `import_errors`

Upload metadata, processing state, counts, storage path, structured row errors, and uploader.

### `audit_log`

Append-only actor/action/entity/change metadata written by trusted database/server paths.

Later migrations add questions, answers, resources, opportunities, submissions, reflections, and playlist voting only when those feature slices begin.

## 6. RLS policy matrix

### Profiles

- A user can read and update their safe profile fields.
- A mentor can read limited profiles of currently assigned mentees.
- A mentee can read their assigned mentor only after the reveal timestamp.
- Coordinators/admins can read program members and manage permitted fields.
- No browser operation can change another user's authorization.

### Programs, cohorts, and memberships

- Active members read their own program/cohort.
- A user reads their own membership.
- Coordinators/admins manage membership within their program.
- Users cannot promote themselves or activate themselves.

### Assignments and calls

- Mentors read their assignments and create/update attempts for those assignments.
- Mentees read their active assignment only after reveal.
- Mentees see call notes only if explicitly marked participant-visible.
- Coordinators/admins manage the program's records.

### Events and attendance

- Active members read their program events.
- Users read their own attendance.
- Mentors may read assigned mentees' attendance.
- Coordinators/admins manage events and attendance.
- Mentor attendance writes are allowed only if the business rule explicitly grants them.

### Tasks, announcements, and preferences

- Users read tasks assigned to them and update only their own completion.
- Users read announcements targeted to their role/cohort during the publication window.
- Users manage only their notification preferences.
- Coordinators/admins manage definitions and targeting.

### Imports, storage, and audit

- Only coordinators/admins access import jobs and errors.
- Storage policies mirror program membership and administrative authority.
- No client updates or deletes audit records.
- No anonymous access is granted to protected data.

Use carefully audited helper functions such as `has_program_role()` in a non-exposed schema with a fixed `search_path`. Test both grants and policies.

## 7. Migration sequence

1. Extensions, enums, and `updated_at` support.
2. Profiles and a minimal safe `auth.users` trigger.
3. Programs, cohorts, memberships, constraints, and indexes.
4. Authorization helper functions.
5. Mentor assignments and call attempts.
6. Events and attendance.
7. Tasks, announcements, and notification preferences.
8. Import/audit entities and storage policies.
9. Secure aggregate views/RPCs after base policies pass.
10. Deterministic local-only seed fixtures.

Never deploy a table in a temporarily exposed state. RLS should be enabled and policies/grants applied in the migration that exposes it.

## 8. Authentication implementation sequence

1. Install `@supabase/supabase-js` and initialize local Supabase tooling.
2. Add `.env.example` with public URL/publishable key placeholders.
3. Create a typed client that validates required environment variables.
4. Add `AuthProvider`; bootstrap the session and subscribe to auth events.
5. Load the signed-in user's active program membership.
6. Replace fake password submission with `signInWithPassword`.
7. Remove the login role picker.
8. Add safe loading and authentication error states.
9. Add password-reset request and completion routes if passwords remain enabled.
10. Add an auth callback route if the selected provider requires it.
11. Wrap private routes with signed-in and role guards.
12. Redirect after login according to DB membership, never according to form or URL input.
13. Refactor `AppShell` to use the authenticated profile/membership.
14. Remove demo role switching and path-derived identity.
15. Implement real sign-out.
16. Add a clear no-membership state for authenticated but unprovisioned accounts.
17. Verify refresh/session restoration and expired-session behavior.

## 9. User provisioning

The `auth.users` trigger creates only a minimal profile. It must never create an admin/mentor membership from browser-provided metadata.

An invitation/provisioning Edge Function or trusted server endpoint must:

1. Authenticate the caller.
2. Confirm coordinator/admin authority for the selected program.
3. Validate/normalize the email.
4. Invite or match the Auth user.
5. Create the profile/membership/assignment in an auditable operation.
6. Return a safe result without exposing service credentials.

Roster import stages and validates rows first, then calls a trusted transaction to provision accounts and assignments.

## 10. Test plan

### SQL/RLS tests

Actors: anonymous, unprovisioned user, two unrelated mentees, two unrelated mentors, coordinator, and admin.

Required negative tests:

- URL changes do not change a role.
- A mentee cannot read another mentee.
- A mentor cannot read another mentor's roster.
- A user cannot promote or activate themselves.
- A mentee cannot read the mentor before reveal.
- A participant cannot alter imports or audit history.
- Program A cannot read Program B.
- Anonymous access to protected tables returns nothing/is denied.

### Component tests

- Provider bootstrapping and auth event handling.
- Login validation, pending state, and errors.
- Guard loading, redirect, wrong-role behavior, and no-membership state.
- Sign-out and password reset.

### Integration tests

- Invite/provision/login.
- Profile update.
- Assigned mentor records a call.
- Admin records/corrects attendance.
- Unauthorized direct Supabase calls fail.

### End-to-end tests

- Sign in by each role.
- Direct forbidden URL.
- Refresh with a persisted session.
- Expired/no session redirect.
- Sign-out.
- Settings persistence.

### Migration/CI tests

- Clean local database resets from migrations and seed.
- Generated types match schema.
- Formatting, typecheck, build, unit, integration, and E2E gates.

## 11. Parallel-safe PR plan

### PR 1 - platform and schema (Caleb)

Supabase CLI/config, environment sample, migrations, seed, types, and database CI. No broad UI rewrite.

### PR 2 - auth shell (Caleb)

Client, provider, password/reset/sign-out, membership loading, route guards, and identity cleanup. Depends on the PR 1 contract.

### PR 3 - RLS/security review (joint; friend primary reviewer)

Policy matrix, database tests, and threat-model checklist. Must merge before real student data.

### PR 4 - profiles and people (friend)

Settings persistence, avatars/storage policy, directory queries, and admin management.

### PR 5 - mentoring (Caleb implementation, friend UI review)

Assignments, reveal timing, profile access, call CRUD, and aggregates.

### PR 6 - events and attendance (friend implementation, Caleb data review)

Events, attendance CRUD, corrections, summaries, and role views.

### PR 7 - imports (Caleb)

Storage upload, parsing/staging, errors, transactional commit, and audit history.

### PR 8 - release readiness (joint)

E2E, accessibility, complete UI states, staging smoke tests, backup/restore, privacy docs, and release checklist.

Contract-first merge order: PR 1 schema, PR 3 policies/security, PR 2 auth shell, then feature PRs 4-7 in parallel.

## 12. GitHub and review setup

1. Merge CI first and let the `build` job complete successfully.
2. Create the `main-protection` ruleset.
3. Require a PR, one approval, stale-approval dismissal, resolved conversations, and strict required CI.
4. Block force push and deletion.
5. Allow squash merges and automatically delete merged branches.
6. Add CODEOWNERS after both GitHub usernames and ownership are confirmed; do not commit fake handles.
7. Validate with a small test PR.

## 13. Board structure

Columns:

1. Backlog
2. Ready
3. In Progress
4. Review
5. Blocked
6. Done

Labels:

- `area:auth`, `area:database`, `area:ui`, `area:security`, `area:devops`, `area:product`
- `priority:p0`, `priority:p1`, `priority:p2`
- `risk:privacy`, `risk:external-dependency`, `risk:migration`
- `size:1`, `size:2`, `size:3`, `size:5`, `size:8`, `size:13`

Use Fibonacci points. A 13-point card must be split before entering In Progress.

## 14. Definitions

### Definition of Ready

- User outcome and acceptance criteria are explicit.
- Owner and reviewer are assigned.
- Dependencies and schema/API contracts are known.
- Security/privacy implications are noted.
- Card is 8 points or fewer.

### Definition of Done

- Acceptance criteria pass.
- Formatting, typecheck, build, and relevant tests pass.
- RLS negative tests exist for protected data.
- Loading, empty, error, unauthorized, and success states are handled.
- No secret or real student data is committed.
- Migration/types/docs are updated.
- PR has one non-author approval and all comments are resolved.
- Staging smoke test passes for user-visible or backend-integrated changes.

## 15. First secure milestone acceptance

- Invited user can sign in, refresh, reset password, and sign out.
- Dashboard selection comes from membership, with no role picker/switcher.
- Anonymous, unprovisioned, and wrong-role access is blocked in UI and database.
- Profile and notification settings persist.
- A clean local database reproduces from migrations and seed.
- Generated types match the schema.
- RLS abuse matrix, typecheck, build, and auth tests pass in CI.
- No service-role key or real data appears in source, browser bundles, logs, or fixtures.

Only after this milestone should the team replace all static feature data.
