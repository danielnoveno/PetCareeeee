# PetCare Working Agreement

## Product and scope

- Use `PetCare` for the brand and `petcare` for technical identifiers.
- Read the relevant sections of `docs/PRD.md` and `docs/MVP.md` before feature work.
- Work on one coherent acceptance criterion at a time. Do not add speculative abstractions.
- PetCare is not a diagnostic tool and must never infer diagnoses or medication doses.
- Keep original medical documents; extracted data is always an unconfirmed draft.

## Engineering workflow

- Think before coding, prefer simple built-in solutions, and keep changes surgical.
- Explain the concept before its first use and make important logic visible.
- Use npm. Keep TypeScript strict.
- Before handing off code, run `npm run verify`.
- State which platforms were actually tested. Android results do not prove iOS behavior.
- Never push, publish, deploy, submit, or run an EAS build without user approval.
- Never store secrets, credentials, provider keys, or a local `.env` in Git.

## Multi-harness safety

- Codex is the primary writer. OpenCode is an independent read-only reviewer.
- Only one harness may write to a working tree at a time.
- Run `git status` and `git diff` before switching harnesses.
- Reviewers inspect the diff and report findings; they do not edit files.
- Do not enable auto-approval, dangerous sandbox bypass, autonomous loops, hooks, or MCP without an audited and approved setup.

## Learning contract

- Connect each change to React Native, Expo, TypeScript, database, testing, Git, privacy, or iOS concepts.
- Prefer hints and small exercises over hiding logic in generated abstractions.
- After implementation, report: What changed, Why, What you should understand, Verification, Your exercise, and three review questions.
- Record durable lessons and platform verification in `docs/LEARNING_LOG.md`.
