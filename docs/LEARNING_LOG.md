# Learning Log

## 2026-07-29 — Phase 0 and foundation

### Concepts

- Expo Router uses the file tree as the navigation map.
- TypeScript strict mode catches uncertain values before runtime.
- Environment validation turns build-time text into a small trusted union.
- A database migration is an ordered, repeatable schema change.
- Local-first means core records live on the device before any cloud service is
  introduced.
- A shared skill is reusable workflow guidance; an agent adds a role and
  permissions; a command is an explicit entry point.

### Decisions

- Use Expo SDK 57 and require Node 22.13 or newer.
- Keep five navigation destinations as placeholders during foundation.
- Create only SQLite migration infrastructure; feature tables are deferred.
- Keep Codex as writer and OpenCode reviewer read-only.
- Add no hooks or MCP servers.
- Replace the generic scaffold icon with one project-local PetCare app icon.

### Verification reality

- Source and configuration were created on Windows.
- Automated dependency-based checks are pending a Node LTS upgrade.
- Formatting completed with Prettier 3.9.6 through a one-off npm execution.
- `npm run verify` currently stops because local dependencies are intentionally
  not installed under the unsupported Node runtime.
- Android Emulator and ADB are not available from PATH.
- No EAS build or physical-iPhone test has run.

### Next learning step

After environment repair and foundation verification, implement Pet Profile as
a separate phase beginning with one model and one migration.
