# PetCare Agent Setup

Audited on 2026-07-29. This session made project-local, add-only changes. It
did not install an agentic package, alter global configuration, enable a hook,
or add an MCP server.

## Components

| Component                                   | Source                                                                 | Version / revision   | Status                   | Scope                          | Files created                                    | Hooks      | MCP                                                      | Permissions                                                            | Verification                                               | Update                                                    | Uninstall                                                      |
| ------------------------------------------- | ---------------------------------------------------------------------- | -------------------- | ------------------------ | ------------------------------ | ------------------------------------------------ | ---------- | -------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Codex CLI                                   | `github.com/openai/codex`                                              | 0.146.0              | Installed before session | Global npm                     | None                                             | None added | Existing global `blender` entry; unrelated and unchanged | Current host policy; no project override                               | `codex --version` and `codex --help` passed                | `codex update` or audited `npm update -g @openai/codex`   | Audited `npm uninstall -g @openai/codex`                       |
| OpenCode CLI                                | `github.com/anomalyco/opencode`                                        | 1.18.9               | Installed before session | Global npm                     | None                                             | None added | None added                                               | Project approval-first baseline                                        | `opencode --version` and help passed                       | `opencode upgrade` or audited `npm update -g opencode-ai` | `opencode uninstall` or audited `npm uninstall -g opencode-ai` |
| Shared review skill                         | Project specification; format verified against Codex and OpenCode docs | Project revision     | Installed                | Repository                     | `.agents/skills/petcare-review/SKILL.md`         | None       | None                                                     | Skill load allowed; reviewer remains read-only                         | Discovered by both CLIs                                    | Edit canonical file in one reviewed change                | Delete its folder and remove adapter references                |
| Learning coach skill                        | Project specification                                                  | Project revision     | Installed                | Repository                     | `.agents/skills/petcare-learning-coach/SKILL.md` | None       | None                                                     | Skill load allowed                                                     | Discovered by both CLIs                                    | Edit canonical file                                       | Delete its folder and remove permission entry                  |
| OpenCode reviewer                           | Project specification; OpenCode agent schema                           | Project revision     | Installed                | Repository                     | `.opencode/agents/code-reviewer.md`              | None       | None                                                     | Edit/task/external/web denied; safe Git and verification reads allowed | Config/agent discovery passed; write test deferred to user | Edit adapter when OpenCode schema changes                 | Delete agent and command files                                 |
| ECC                                         | `github.com/affaan-m/ECC`                                              | Not fetched          | Deferred                 | Toolbox only if approved later | None                                             | None       | None                                                     | None                                                                   | Not run                                                    | Re-audit upstream first                                   | Nothing installed                                              |
| Ruflo                                       | `github.com/ruvnet/ruflo`                                              | Not fetched          | Deferred                 | Agent lab only                 | None                                             | None       | None                                                     | None                                                                   | Not run                                                    | Re-audit upstream first                                   | Nothing installed                                              |
| Agent Orchestrator                          | `github.com/Untrivial-ai/agent-orchestrator` or official redirect      | Not fetched          | Deferred                 | External toolbox               | None                                             | None       | None                                                     | None                                                                   | Not run                                                    | Re-audit after Git/test stability                         | Nothing installed                                              |
| Expo / Callstack / OpenAI skill collections | Official repositories listed in the project specification              | Not fetched          | Reference only           | None                           | None                                             | None       | None                                                     | None                                                                   | Not run                                                    | Evaluate one skill at a time                              | Nothing installed                                              |
| Apple HIG / testing / privacy skills        | Source not selected                                                    | Not fetched          | Deferred                 | Project-local only if approved | None                                             | None       | None                                                     | None                                                                   | Not run                                                    | Record source, SHA, license                               | Nothing installed                                              |
| Karpathy principles                         | `github.com/multica-ai/andrej-karpathy-skills`                         | No package installed | Reference only           | `AGENTS.md` principles only    | No external skill copy                           | None       | None                                                     | None                                                                   | Rules readable                                             | Review wording in Git                                     | Remove the concise rules                                       |
| Ponytail                                    | `github.com/DietrichGebert/ponytail`                                   | Not fetched          | Deferred                 | None                           | None                                             | None       | None                                                     | None                                                                   | Not run                                                    | Revisit after two features                                | Nothing installed                                              |

## Active project permissions

The root `opencode.json` disables sharing. It asks before edits, tasks,
external-directory access, unknown skills, unknown shell commands, and EAS
builds. It allows read/search, the two PetCare shared skills, safe Git
inspection, lint, typecheck, and tests. It explicitly denies push, hard reset,
publish, and EAS submit.

The `code-reviewer` adapter is stricter: file edits, tasks, external directory
access, web access, EAS builds, push, hard reset, and publish are denied.

## Configuration audit

- Global Codex config existed and was not edited or backed up because no write
  was performed.
- The global Codex config contains an unrelated Blender MCP entry. PetCare
  does not call or depend on it.
- A separate global file named `yolo.config.toml` exists. It was not activated,
  edited, or copied into this repository.
- Global OpenCode config contains only its schema declaration and was not
  edited.
- No project `.codex/config.toml`, hook, MCP, plugin, autonomous loop,
  auto-push, auto-deploy, or auto-approval was created.

## Canonical skill and adapters

`.agents/skills` is canonical because both installed CLIs document this
project-local discovery path. The OpenCode Markdown agent and command are thin
adapters; they do not duplicate review instructions. A Codex custom agent is
not needed at foundation because Codex can load the shared review skill
directly.

Verification used `codex debug prompt-input`, `opencode debug skill`,
`opencode debug config`, and `opencode agent list`. The independent review
prompt itself was not run.

## Switching harnesses

1. Stop the writer.
2. Run `git status` and `git diff`.
3. Commit or stash coherent work before allowing another writer.
4. Run OpenCode through the read-only reviewer.
5. Return findings to the user; do not auto-apply them.

Never run Codex and OpenCode as simultaneous writers in one working tree.

## User verification

Run this yourself after dependencies and the Node environment are repaired:

```powershell
opencode agent list
```

Then start a fresh OpenCode session and invoke `/petcare-review`. Confirm it can
read the diff but cannot edit a file. A fresh Codex session should list
`petcare-review` and `petcare-learning-coach` from `.agents/skills`.
