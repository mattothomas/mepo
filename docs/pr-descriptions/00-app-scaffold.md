# PR 0: Establish the canonical React/Vite application scaffold

## Summary

Moves the generated MEPO prototype into the canonical React/Vite project structure so later documentation, Supabase, and authentication pull requests have a buildable base.

## Changes

- Adds the canonical application under `src/`.
- Adds the Vite/Figma project support files under `.figma/make/`.
- Adds the application screens, shared shell, routes, styles, and TypeScript entry points.
- Adds the lockfile and repository configuration used by the current prototype.

## Why this is separate

This isolates the existing prototype/scaffold from all new planning, database, security, and authentication work. Reviewers can establish that the starting UI matches the intended prototype before reviewing backend changes.

## Testing

- Install dependencies with `npm ci`.
- Run `npm run build`.
- Manually open the landing and demo login/dashboard routes.

## Security and privacy

- This is a frontend prototype containing static sample data.
- It does not add real authentication, authorization, storage, or a database.
- It must not be used with real student information.
- Demo role selection is removed by PR 3.

## Review guidance

Please focus on:

1. Whether `src/` is accepted as the canonical source location.
2. Whether every expected prototype screen is present.
3. Whether generated/Figma support files should remain version-controlled.
4. Whether the existing static sample identities are acceptable as obvious fixtures.

## Dependencies

None. Merge this before the Supabase platform and frontend authentication PRs.

## Rollback

Revert the scaffold commit. It does not alter any external service or database.
