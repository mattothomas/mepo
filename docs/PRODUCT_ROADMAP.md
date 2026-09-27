# MEPO Product Roadmap

This document converts the ideas in **MEPO Website Brainstorming.pdf** into a prioritized product roadmap. The PDF is brainstorming input, not a final requirements contract.

For Jira board setup, milestone status, epics, workflow, ownership, and import instructions, see [JIRA_PROJECT_PAGE.md](JIRA_PROJECT_PAGE.md). Jira-importable stories are maintained in [BACKLOG.csv](BACKLOG.csv).

## Current state

MEPO is currently a polished React/Vite frontend prototype. Login redirects according to a user-selected role, and dashboards, people, calls, attendance, settings, uploads, schedules, and announcements use hard-coded data. There is no real authentication, authorization, database, file storage, notification service, backend API, audit trail, or production deployment workflow.

## Difficulty guide

- **Easy:** approximately 1-4 developer days after the platform foundation exists.
- **Medium:** approximately 1-2 developer weeks.
- **Hard:** approximately 2-6+ developer weeks or an external/institutional dependency.
- **(Stretch):** useful later, but not required for the first production release.

Estimates assume one developer. Penn State approvals and third-party API access can increase them.

## Required foundation

### Product and privacy decisions

- Decide whether the first release is a responsive web app, installable PWA, or native mobile app.
- Confirm the initial users: mentees, mentors, coordinators, and administrators.
- Define the minimum workflows needed for the first live MEPO event.
- Obtain approval for student records, attendance, phone numbers, resumes, schedules, recordings, and messaging.
- Define retention, correction, export, and deletion policies.
- Confirm availability of Penn State SSO, LionPATH, Canvas, Microsoft 365, and ID-scanner integrations.
- Start with email reminders; add SMS only after consent, cost, and opt-out requirements are understood.

### Authentication and authorization - Medium

**Goal:** Users securely sign in and can access only the data permitted for their role.

**Required work:**

- Add Supabase Auth, preferably with Penn State SSO later if institutional OAuth/SAML/OIDC access is available.
- Create server-managed mentee, mentor, coordinator, and administrator roles.
- Remove the role selector from production login.
- Add protected routes, session restoration, password reset, sign-out, and account activation.
- Enforce authorization in PostgreSQL Row Level Security, not only in React.
- Test cross-role and cross-user access attempts.

### Database and application services - Medium

**Goal:** Replace hard-coded arrays with durable records.

Initial entities:

- users/profiles and roles
- cohorts and program terms
- mentor-mentee assignments
- events and sessions
- attendance and exceptions
- call attempts and notes
- tasks and completion records
- announcements
- notification preferences and delivery records
- uploads/import jobs and stored files
- audit events

Required work includes versioned migrations, generated TypeScript types, validation, constraints, loading/error/empty states, development/staging/production separation, backups, and restore testing.

### Connect the existing screens - Medium

- Dashboard cards query the authenticated user's records.
- Settings saves profile and notification preferences.
- People supports real search, editing, assignment, and deactivation.
- Calls saves attempts, outcomes, notes, follow-up dates, and escalation status.
- Attendance displays actual event records and exceptions.
- Mentor Reveal uses a real assignment and server-controlled release time.
- Tasks persist completion.
- Announcements and schedules are administered content.
- Uploads processes real CSV/XLSX files instead of simulated state changes.

### Quality and operations - Medium

- Fix the mojibake/encoding defects currently visible in labels and icons.
- Make all major workflows responsive and keyboard accessible.
- Add unit, integration, and end-to-end tests.
- Add structured logs, error monitoring, audit history, and support procedures.
- Add CI for build, typecheck, formatting, tests, and migration validation.
- Create staging and production deployments with HTTPS, backups, rollback, and secret management.
- Publish privacy, acceptable-use, support, and incident-response documentation.

## Easy features

### Announcements and event calendar

**Goal:** Put MEPO events and updates in one place.

Admin CRUD, audience targeting by role/cohort/major/interest, event details, RSVP, and optional `.ics` calendar downloads.

### Interest-based activity notifications

**Goal:** Notify students about breakfast, intramural sports, and other relevant activities.

Interest preferences, event tags, notification settings, and scheduled email reminders. Use a limited cadence rather than repeated messages until a response.

### Internal profile directory

**Goal:** Help participants find one another and share professional links.

Search/filtering, user-controlled field visibility, privacy-first defaults, reporting, and moderation.

**(Stretch: social posts, follows, likes, comments, and a feed.)**

### Community resource directory

**Goal:** Centralize recommended barbers, braiders, churches, study locations, food, and similar resources.

Categories, listings, links, locations, search, recommendations/ratings, moderation, and clear sponsored-placement disclosures.

### Upperclassman advice board

**Goal:** Preserve useful advice that would otherwise spread by chance.

Topics, tagged posts, search, bookmarks, featured/verified answers, reporting, and moderation.

### Basic Q&A board

**Goal:** Reduce repeated questions and make answers reusable.

Questions, replies, categories, search, accepted answers, duplicate suggestions, notifications, and staff moderation.

### Basic document submission

**Goal:** Replace Qualtrics-based resume and presentation collection.

Assignments, due dates, file restrictions, secure storage, resubmission, standardized server-generated names, malware scanning, receipts, late status, and admin download.

## Medium features

### Production roster import

Real CSV/XLSX parsing, templates, column mapping, row validation, preview, deduplication, confirmation, rollback, and import audit history.

### ID or QR attendance

Scanner/provider verification, identity mapping, live check-in, duplicate prevention, offline recovery, manual correction, timestamps, early departure, excused status, notes, exports, and reports.

A rotating short-lived QR/code check-in is a safer first release than continuous location tracking.

### Debrief and reflection workflow

Session prompts, response deadlines, individual/small-group stages, an optional anonymous mode, completion reminders, summaries, and exports.

### Q&A escalation

Open/acknowledged/answered/escalated/closed states, ownership, escalation timers, notification routing, and an overdue dashboard. A five-minute promise requires active staffing.

### Submission reminder automation

Scheduled jobs, email templates, due-date/submission-aware cadence, preferences, delivery status, bounce handling, and failure monitoring.

### Exam bank

First define the academic-integrity and copyright policy. Then implement course/professor/term/topic metadata, secure uploads, search, acknowledgements, moderator review, takedowns, and archival.

### Playlist voting

Song suggestions, votes, content filtering, rate limits, moderator control, and queue locking. Provider-controlled playback is a harder stretch layer.

### Tailored opportunity digest

An admin-curated opportunity database with eligibility, dates, deadlines, source links, major/interest matching, reminders, and review before publication.

## Hard features

### Automated email ingestion for attendance exceptions

Requires an approved mailbox, official mail API access, parsing, attachment handling, identity/event matching, human review, retention rules, and audit history. AI interpretation must not directly change official attendance without review.

### AI debrief summarization

Requires consent, secure storage, redaction, clustering, summarization, human correction, cost limits, deletion controls, and evaluation for hallucinations and missed minority viewpoints. Begin with typed responses, not live audio.

### Automated opportunity scraper

Requires permitted sources/APIs, source-specific ingestion, deduplication, validation, website-change monitoring, human approval, and terms-of-service compliance.

### Similar-schedule matching

Requires Penn State approval and an official LionPATH data path, explicit consent, secure schedule handling, privacy-preserving matching, blocking controls, and careful academic-advising boundaries. Manual optional course entry is the fallback.

## Stretch features

### (Location-based attendance monitoring)

Requires explicit consent, institutional/legal review, native background-location support, geofencing, battery and indoor-accuracy testing, appeals, and deletion rules. This is not recommended for the MVP.

### (Continuous recording and AI advice packages)

Requires consent from every participant, state-law and university review, capture, transcription, speaker handling, redaction, summarization, secure retention, and deletion requests.

### (Internal social network)

Requires media posts, comments, reactions, follows, notifications, privacy, blocking, reporting, moderation, storage, and abuse-response operations. Validate the profile directory first.

### (OCR document identification)

Requires text extraction/OCR, confidence scores, authenticated identity matching, ambiguity review, secure processing, and deletion of intermediate artifacts.

### (Automatic music playback)

Requires provider authorization, premium-account/device rules, synchronization, moderation, and licensing/event-use review.

## Recommended product sequence

1. Decisions, privacy rules, and institutional approvals.
2. Authentication, server-assigned roles, and protected routes.
3. Database, RLS, storage, audit logs, backups, and generated types.
4. Connect profiles, assignments, dashboards, calls, attendance, and settings.
5. Production roster import.
6. Events, announcements, tasks, and email notifications.
7. QR/ID attendance with manual corrections and exceptions.
8. Document submissions and deadline reminders.
9. Profile/resource/advice directories and Q&A.
10. Debriefs and opportunity digests.
11. Institution-dependent integrations.
12. AI and stretch features after privacy review and real-user validation.

The recommended MVP is secure authentication and roles, real data, mentor assignments, calls, attendance, events, tasks, announcements, roster imports, document submissions, and notifications.
