---
name: petcare-review
description: Review one coherent PetCare change for correctness, privacy, scope, tests, and learning quality without editing files
---

# PetCare Review

Use this skill after one coherent implementation change.

## Required checks

1. Read `AGENTS.md`.
2. Read only the relevant sections of `docs/PRD.md` and `docs/MVP.md`.
3. Inspect `git status` and `git diff`.
4. Do not edit, create, delete, or format files.
5. Report findings by severity with file references.
6. Check correctness, data loss, privacy, secrets, medical-safety boundaries, missing tests, unnecessary dependencies, and scope creep.
7. Distinguish verified Android behavior, verified iOS behavior, and unverified assumptions.
8. End with the key concept the learner should understand.
