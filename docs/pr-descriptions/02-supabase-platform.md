# PR 2: Add Supabase platform, schema, RLS, and CI foundation

## Summary

Introduces the credential-independent Supabase platform layer: CLI configuration, environment contract, initial schema, Row Level Security policies, typed database definitions, repository CI, and pull-request standards.

## Changes

- Adds `@supabase/supabase-js` and the Supabase CLI.
- Adds `.env.example` containing browser-safe variable names only.
- Initializes local Supabase configuration with invite-only signup.
- Adds profiles, programs, cohorts, and program memberships.
- Adds authoritative program-scoped roles.
- Adds a minimal Auth-user profile trigger.
- Adds RLS policies and manager helper functions.
- Adds generated-shape TypeScript database definitions.
- Adds CI for formatting, type checking, and production build.
- Adds a repository pull-request template.
- Adds local development and hosted-project setup instructions.

## Why this is separate

This PR establishes the data and security contract without altering application navigation or login behavior. The frontend authentication PR depends on this contract.

## Testing

- `npm run format:check`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

Local migration execution still requires Docker. Hosted migration execution requires the staging Supabase project.

## Security and privacy

- Public signup is disabled locally.
- Browser environment variables accept only the project URL and publishable key.
- Service-role/secret keys are explicitly prohibited from `VITE_*` variables.
- Roles are stored in `program_memberships`, not user-editable profile metadata.
- RLS is enabled on every initial public table.
- Anonymous grants are revoked.
- Users cannot directly update profile status or membership roles.

## Review guidance

Please review the migration first, particularly:

1. The `program_role` enum.
2. Program-scoped membership design.
3. `security definer` helper functions and fixed `search_path`.
4. Column-level profile update grants.
5. Self-versus-manager RLS behavior.
6. Whether coordinator and administrator should remain separate roles.

## Dependencies

- PR 1 documents the design but is not a runtime dependency.
- PR 3 must be based on or merged after this PR.

## Deployment

1. Create a staging Supabase project.
2. Disable public signup in hosted Auth settings.
3. Configure exact redirect URLs.
4. Link the CLI to staging.
5. Apply the reviewed migration.
6. Generate fresh types from staging.
7. Use test accounts only until the RLS abuse matrix passes.

## Rollback

This is pre-production. If rejected, delete the staging project or apply a reviewed forward migration. Do not manually edit a production schema.
