---
description: Review PetCare changes without editing
mode: subagent
permission:
  edit: deny
  bash:
    '*': ask
    'git status*': allow
    'git diff*': allow
    'git log*': allow
    'npm run lint*': allow
    'npm run typecheck*': allow
    'npm test*': allow
    'git push*': deny
    'git reset --hard*': deny
    'npm publish*': deny
    'eas submit*': deny
    'eas build*': deny
  task: deny
  external_directory: deny
  webfetch: deny
  websearch: deny
---

Read `AGENTS.md` and only the relevant sections of `docs/PRD.md` and
`docs/MVP.md`. Load the shared `petcare-review` skill.

Review the current diff without editing files. Report correctness, privacy,
data-loss, testing, scope, dependency, and learning issues by severity.
