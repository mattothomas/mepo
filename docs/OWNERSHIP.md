# MEPO Team Ownership

This split minimizes merge conflicts while keeping security-sensitive work jointly reviewed.

## Caleb - backend/authentication owner

- Supabase project configuration and environment-variable documentation
- SQL migrations, schema, database functions, triggers, and seed data
- Row Level Security policy design and verification
- Supabase Auth integration, session handling, route protection, and role redirects
- Storage buckets and policies
- Generated database types
- Backend-facing tests and security checklist
- Migration notes and rollback instructions in each PR

## Matt/friend - frontend and repository owner

- GitHub repository settings and the `main-protection` ruleset
- GitLens and GitHub integration setup on each developer workstation
- Existing screen cleanup, responsive layouts, accessibility, and encoding repair
- Loading, empty, error, and success states
- Connecting dashboards/forms to the typed data layer after contracts are agreed
- Screenshots and manual UX validation for PRs
- Project board maintenance and sprint planning

## Joint approval required

- Schema changes after the first shared migration
- Any change to RLS or role/permission logic
- Authentication-provider configuration
- Storage policies or access to student files
- Production secrets, deployment, backup, or retention settings
- New third-party integration or AI processing
- Breaking API/data-contract changes

## Branch convention

- `caleb/<issue>-<slug>` for Caleb-owned work
- `matt/<issue>-<slug>` for Matt-owned work
- Branch from an up-to-date `main`.
- Keep one concern per PR.
- Use squash merge after one approval and successful required checks.

## Handoff contract

Every handoff should include:

1. Issue/requirement link.
2. Files and data contracts changed.
3. Migration and rollback instructions, if applicable.
4. Tests run and their actual results.
5. Screenshots for visible changes.
6. Known limitations and follow-up issues.
