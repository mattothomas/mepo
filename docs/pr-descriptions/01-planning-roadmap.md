# PR 1: Add MEPO delivery roadmap, backlog, and ownership

## Summary

Documents the agreed MEPO product direction and converts the brainstorming notes into a staged engineering plan that two developers can execute without overlapping responsibilities.

## Changes

- Adds the complete product roadmap grouped by easy, medium, hard, and stretch work.
- Adds a detailed Supabase-first implementation plan.
- Adds a Fibonacci-point backlog suitable for Trello or Jira import.
- Defines Caleb's backend/auth ownership and Matt's frontend/repository ownership.
- Documents the GitLens-assisted PR workflow and recommended GitHub review rules.

## Why this is separate

This PR contains documentation only. It allows the team to agree on scope, ownership, and sequencing before reviewing executable authentication or database changes.

## Testing

- Documentation reviewed for internal links and consistency.
- No runtime code changes.

## Security and privacy

- Documents the requirement to keep service-role keys out of the browser.
- Documents invite-only onboarding, RLS testing, and restrictions on real student data.
- Does not contain credentials or student records.

## Review guidance

Please focus on:

1. Whether the MVP scope is correct.
2. Whether the Caleb/Matt ownership split is workable.
3. Whether the PR ordering and acceptance criteria are clear.
4. Whether any student-data category needs additional institutional approval.

## Dependencies

None. This is the first PR in the stack.

## Rollback

Revert the documentation commit. There is no application or database effect.
