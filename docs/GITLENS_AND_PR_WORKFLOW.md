# GitLens and Pull Request Workflow

## What GitLens can do

GitLens can explain changes/commits/branches, generate commit messages, generate changelogs, and provide a user-triggered AI draft for a pull request title and description. It does not enforce review approval and should not be trusted to claim that tests ran without evidence.

Official references:

- https://help.gitkraken.com/gitlens/gitlens-features/
- https://help.gitkraken.com/gitlens/gl-release-v17-x/
- https://help.gitkraken.com/gitlens/gitlens-settings/

## Workstation setup

1. Install or update GitLens in VS Code.
2. Sign in to GitKraken from GitLens.
3. Connect the GitHub integration that has access to `mattothomas/mepo`.
4. Enable GitLens AI and choose the team-approved provider/model.
5. Configure `gitlens.ai.generateCreatePullRequest.customInstructions` with the template expectations below.
6. Confirm whether the selected AI feature is included in the team's GitLens plan.

Suggested custom instructions:

> Use sections Summary, Changes, Testing, Screenshots, Database migrations, Security and privacy, Rollback, and Related issue. Never claim a test ran unless the branch contains evidence or the author supplies the result. Call out RLS, secrets, and breaking data changes explicitly.

## Per-PR workflow

1. Select a board card and move it to In Progress.
2. Pull `main` and create a narrowly scoped branch.
3. Implement with small, reviewable commits.
4. Run formatting, typecheck, tests, and build.
5. Push the branch.
6. In GitLens Commit Graph, choose Create Pull Request and use the AI draft option.
7. Compare the generated text with the actual diff and test output.
8. Add screenshots, migration details, security notes, and rollback steps.
9. Request the other developer's review.
10. Resolve comments, rerun checks, obtain a fresh approval if new commits invalidate it, and squash merge.

GitHub Copilot can also draft a PR summary on GitHub, while `gh pr create --fill` creates a deterministic PR from the command line. GitHub Actions runs required checks. These are complementary; none replaces review rules.

## GitHub ruleset to configure

After the CI workflow has run successfully once:

1. Open repository **Settings > Rules > Rulesets**.
2. Create an active branch ruleset named `main-protection` targeting the default branch.
3. Require a pull request before merging.
4. Require one approval.
5. Dismiss stale approvals after new commits.
6. Require all conversations to be resolved.
7. Require the CI `build` check; add typecheck/tests when those checks exist.
8. Require the branch to be current before merging.
9. Block force pushes and deletion.
10. Keep the bypass list empty for ordinary work.
11. Enable squash merging and automatic branch deletion in repository settings.
12. Validate the rules with a small test PR.

GitHub ruleset documentation:

- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

Do not enable merge queue yet; a two-person personal-account repository does not need it.
