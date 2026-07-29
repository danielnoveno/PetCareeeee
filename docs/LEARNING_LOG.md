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

- Use Expo SDK 57 with Node 24 LTS.
- Keep five navigation destinations as placeholders during foundation.
- Create only SQLite migration infrastructure; feature tables remain deferred.
- Keep Codex as writer and OpenCode reviewer read-only.
- Add no hooks or MCP servers.
- Replace the generic scaffold icon with one project-local PetCare app icon.

### Verification reality

- Source, configuration, and automated checks were completed on Windows.
- Node 24.18.0 and npm 11.16.0 are active.
- Gradle's `JAVA_HOME` points to Android Studio's verified JBR 17.0.11.
- The Android SDK, ADB, Emulator, command-line tools, and one AVD were found.
- `npx expo install --check` reports dependencies are up to date.
- `npx expo-doctor` passes all 20 checks.
- `npm run verify` passes TypeScript, ESLint, Prettier, and 7 Jest tests.
- The Android emulator and application were not started.
- iOS was not tested; Android environment checks do not establish iOS
  behavior.
- No EAS build, submit, commit, push, hook, MCP, or other agentic installation
  was performed.

### Lessons from the environment repair

- Resolve and execute exact tool paths before persisting environment variables;
  a default-looking path is not evidence that the tool lives there.
- Back up both user and machine environment state before editing user-level
  values.
- Validate a new runtime before relying on it, and retain a recoverable copy of
  the previous runtime.
- Expo config runs through a CommonJS boundary, so imported local
  configuration helpers must be loadable in that context.
- Peer dependencies and lint resolvers should be declared directly when the
  project uses them instead of relying on a package's nested dependency tree.

## 2026-07-29 — First Android verification preflight

### What was verified

- The active repository path is `D:\PROJECT 2026\PetCare`.
- Android SDK Platform 36 and Build-Tools 36.x are not installed.
- SDK Manager offers the stable packages `platforms;android-36` and
  `build-tools;36.0.0`.
- The existing `Pixel_7_API_33` AVD is available, but ADB reports no connected
  emulator.
- Expo dependency compatibility, all 20 Expo Doctor checks, TypeScript, ESLint,
  Prettier, and all 7 Jest tests pass.

### Durable lesson

An AVD definition, an SDK platform, and an ADB-connected emulator are separate
layers. The AVD says a virtual device can be started; Platform and Build-Tools
provide compile-time Android files; ADB confirms a running device can receive
the built app. All three layers must be ready before a local Android run can
prove installation and UI behavior.

The current shell can also retain an older process environment after valid
user-level settings change. A process-local JBR 17 reference can verify SDK
metadata without rewriting the persisted Java or PATH configuration.

### Verification boundary

No SDK package was installed because installation requires explicit approval.
No emulator was created or started, and no Gradle build, app installation,
navigation test, environment-check screen test, or Metro error inspection was
performed. iOS remains untested and cannot be inferred from this Android
preflight. No business feature changed.

### Next learning step

After approval, install only Android SDK Platform 36 and stable Build-Tools
36.0.0, start the existing AVD, confirm ADB reports it as `device`, and run the
first Android build. Pet Profile remains intentionally unimplemented.
