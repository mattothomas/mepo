# PR 3: Connect the React app to Supabase authentication

## Summary

Replaces demo authentication and URL-derived roles with Supabase sessions, authoritative program memberships, protected routes, authenticated identity, and real sign-out behavior.

## Changes

- Adds one typed Supabase browser client.
- Adds `AuthProvider` session and membership hydration.
- Replaces fake login redirects with `signInWithPassword`.
- Removes the browser-controlled role selector.
- Protects all mentee, mentor, coordinator, and administrator routes.
- Redirects wrong-role users to their authorized dashboard.
- Adds an unprovisioned-account state.
- Uses the authenticated profile in the application shell.
- Removes the demo role switcher.
- Implements Supabase sign-out.
- Keeps Penn State SSO disabled until an approved identity provider is configured.

## Why this is separate

This PR is the visible application integration. It is easier to review after the schema/RLS contract is approved independently.

## Testing

- `npm run format:check`
- `npm run typecheck`
- `npm run build`
- Manual configuration-missing login state.

Full login, refresh, wrong-role, and sign-out testing requires a staging Supabase project with test memberships.

## Security and privacy

- Dashboard selection comes from database membership rather than form input or URL.
- Route guards improve UX; RLS remains the security boundary.
- No service-role key is used by the frontend.
- SSO cannot be invoked before configuration.
- Unprovisioned authenticated accounts receive no dashboard access.

## Review guidance

Please focus on:

1. Session bootstrapping and auth-event cleanup.
2. Membership loading and the no-membership state.
3. Role-route nesting and redirect behavior.
4. Removal of all demo role escalation paths.
5. Error text and loading behavior.

## Dependencies

Requires PR 2 because it imports the Supabase package, typed database contract, and membership schema.

## Follow-up work

- Password-reset request and completion screens.
- Component and end-to-end auth tests.
- Multi-program membership selector.
- Approved Penn State SSO integration.

## Rollback

Revert this PR to restore the prototype navigation. No database rollback is required.
