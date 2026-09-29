# MEPO Jira Project Page

This page converts the MEPO brainstorming document and existing roadmap into a Jira-ready delivery plan. Brainstorming ideas are product input, not approved requirements. Privacy-sensitive, institution-dependent, AI, and continuous-monitoring ideas require review before implementation.

## Project goal

Deliver a secure MEPO web application for invited mentees, mentors, coordinators, and administrators before expanding into community, automation, and stretch features.

## Board configuration

- **Project key:** `MEPO`
- **Board type:** Scrum
- **Workflow:** Backlog -> Ready -> In Progress -> In Review -> Blocked -> Done
- **Hierarchy:** Epic -> Story/Task -> Sub-task
- **Estimation:** Story points using `1, 2, 3, 5, 8, 13`
- **Sprint length:** Two weeks
- **Definition of ready:** Acceptance criteria, owner, dependencies, data/design notes, and privacy/security impact are documented.
- **Definition of done:** Acceptance criteria pass, CI passes, documentation is updated, security/privacy checks are complete, and one teammate approves the PR.

## Current delivery status

| Area | Status | Evidence / next action |
| --- | --- | --- |
| Product roadmap and ownership | Done | PR #2 is marked merged and the planning files are present on `main`. |
| Supabase staging project | Done outside the repository | The hosted project is active, the initial migration is recorded remotely, Auth URLs are configured, and the first admin membership is active. |
| Supabase schema PR | Integration check required | PR #3 is marked merged, but its Supabase files are not present in the latest `origin/main` checkout. Reconcile Git history before new schema work. |
| Frontend authentication PR | Integration check required | PR #4 is marked merged, but its auth files are not present in the latest `origin/main` checkout. Reconcile Git history, then rerun typecheck, build, and auth smoke tests. |
| GitHub branch protection | Ready | Matthew should require review and CI, dismiss stale reviews, and block force pushes on `main`. |

## Epics

| Epic | Outcome | Priority | Owner | Target |
| --- | --- | --- | --- | --- |
| MEPO-E1 Platform and delivery | Reliable repository, CI, environments, releases, and recovery | Highest | Caleb + Matthew | Milestone 1 |
| MEPO-E2 Identity and access | Invite-only login, server-assigned roles, protected routes, and recovery | Highest | Caleb | Milestone 1 |
| MEPO-E3 Core program data | Profiles, cohorts, assignments, calls, settings, and dashboards use real data | Highest | Caleb + Matthew | Milestone 2 |
| MEPO-E4 Events and attendance | Events, QR/ID check-in, corrections, exceptions, and reporting | High | Matthew + Caleb review | Milestone 3 |
| MEPO-E5 Communication and engagement | Announcements, activities, Q&A, advice, and debriefs | Medium | Matthew | Milestone 4 |
| MEPO-E6 Documents and imports | Roster imports, secure submissions, reminders, and optional OCR | High | Caleb | Milestone 3 |
| MEPO-E7 Community directory | Member profiles and moderated community resources | Medium | Matthew | Milestone 4 |
| MEPO-E8 Opportunities and academics | Opportunity digest, exam bank, and schedule matching | Low / gated | Joint | Later |
| MEPO-E9 Music and social extensions | Playlist voting and optional provider playback | Low | Matthew | Later |
| MEPO-E10 AI and institutional integrations | AI summaries, email ingestion, LionPATH, SSO, and approved integrations | Gated | Joint | Stretch |

## Release plan

### Milestone 1 - Secure foundation

- Reconcile PRs #3 and #4 with `main`.
- Confirm migrations, generated types, environment documentation, and CI are present.
- Test login, logout, refresh, wrong-role redirects, unprovisioned accounts, and password reset.
- Add RLS abuse tests for anonymous users and unrelated users/programs.
- Enable the `main` ruleset and create the staging release checklist.

**Exit:** An invited user can authenticate and access only the correct role dashboard; unauthorized database calls fail.

### Milestone 2 - Core MEPO workflows

- Persist profiles and notification preferences.
- Add cohorts and mentor-mentee assignments with controlled reveal timing.
- Persist call attempts, outcomes, notes, follow-ups, and escalation state.
- Replace dashboard mock data and complete loading, empty, error, and unauthorized states.
- Add audit history for administrative changes.

**Exit:** Existing core screens work with real program-scoped data.

### Milestone 3 - Operations

- Add events, announcements, tasks, and audience targeting.
- Add roster import with validation, preview, deduplication, rollback, and audit logs.
- Add QR/ID attendance with duplicate prevention, corrections, early departure, excused status, and exports.
- Add private document submissions with due dates, receipts, standardized names, and safe reminders.

**Exit:** Staff can operate a MEPO event without parallel spreadsheets or Qualtrics.

### Milestone 4 - Community experience

- Launch the searchable member directory with privacy controls.
- Launch moderated resources, upperclassman advice, and basic Q&A.
- Add interest-based activity reminders with opt-out controls.
- Pilot structured written debriefs and Q&A escalation.

**Exit:** Repeated questions and community knowledge are discoverable without exposing private data.

### Later and stretch work

- Opportunity digest starts as admin-curated content; scraping requires source and terms review.
- Exam bank requires approved academic-integrity, copyright, takedown, and moderation policies.
- Schedule matching starts with optional manual course entry; LionPATH requires institutional approval.
- Playlist voting may precede provider-controlled playback.
- OCR, AI summaries, email ingestion, location monitoring, continuous recording, and an internal social network require separate approval and risk review.

## Jira labels and components

- **Area:** `area-auth`, `area-database`, `area-security`, `area-ui`, `area-attendance`, `area-community`, `area-documents`, `area-notifications`, `area-devops`
- **Risk:** `privacy-review`, `security-review`, `institutional-dependency`, `third-party-integration`, `ai-review`, `moderation-required`
- **Planning:** `mvp`, `post-mvp`, `stretch`, `blocked`, `needs-decision`

## Priority rules

- **Highest:** Security, authentication, authorization, data-loss risk, and release blockers.
- **High:** Required workflows for the first live program.
- **Medium:** Community and engagement improvements after core data works.
- **Low:** Optional integrations and convenience features.
- **Gated:** Do not schedule until the named approval, policy, or external dependency is resolved.

## Ownership and review

- Caleb owns Supabase, Auth, migrations, RLS, storage policies, generated types, and backend-facing tests.
- Matthew owns repository settings, board maintenance, UI integration, responsive/accessibility work, and UX validation.
- Both approve schema/RLS changes, student-file access, third-party integrations, AI processing, production secrets, and deployment/retention decisions.

## First Jira actions for Matthew

1. Create the `MEPO` Scrum project and workflow listed above.
2. Import `docs/BACKLOG.csv`; map `Title` to Summary, `Area` to Component or Label, `Points` to Story Points, and `Acceptance Summary` to Description.
3. Create the ten epics above and connect imported stories to their matching epic.
4. Put MEPO-029 and MEPO-030 at the top of the board as release blockers.
5. Assign only the next milestone; leave later and stretch work in the backlog.

## Product decisions still needed

- Confirm the first-event MVP and whether the product remains responsive web/PWA.
- Approve retention for attendance, resumes, schedules, recordings, and contact details.
- Confirm whether coordinator and administrator remain separate roles.
- Confirm reminder channels and cadence; avoid repeated messages without consent.
- Assign moderation and response ownership for Q&A, advice, resources, and exam-bank content.
- Confirm which Penn State integrations are officially available.

