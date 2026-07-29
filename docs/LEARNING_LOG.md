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

## 2026-07-29 — New-device Android setup

### What changed

- The old PC environment audit was preserved at
  `docs/environments/OLD-PC.md`.
- `docs/ENVIRONMENT.md` became an index rather than mixing facts from two
  devices.
- The current device audit and cross-device handoff were added.
- Only Android Platform 36 and stable Build-Tools 36.0.0 were installed.

### What was verified

- Process-local Java and Javac are version 17.0.12.
- Platform 36 `android.jar` and Build-Tools 36.0.0 `aapt2.exe` exist.
- Expo dependencies are compatible and Expo Doctor passes 20 of 20 checks.
- TypeScript, ESLint, Prettier, two Jest suites, seven tests, and
  `git diff --check` pass.

### Android build boundary

The first Android build is blocked before Gradle. `Pixel_7_Pro_API_33` exits
before ADB registration, including cold-boot and constrained-memory attempts.
The fallback `Pixel_4_XL_API_33` references an incomplete AVD directory.
Because `adb devices -l` never reported `device`, `npm run android` was not
run. The app, native SQLite startup, navigation, icon, splash, Metro state, and
close/reopen behavior remain unverified. iOS also remains untested.

### Durable lesson

Installing compile-time SDK packages does not prove runtime readiness. Gradle
needs Platform and Build-Tools, but deployment additionally requires a booted
ADB device. A failed emulator must not be silently converted into a successful
Android claim.

### Exercise

Without changing a file, explain the expected output transitions from an empty
`adb devices -l` list, through `offline`, to `device`, and identify the first
state in which an Android build may safely begin.

### Review questions

1. Why does a successful `android.jar` check not prove that the app can be
   installed?
2. Why was `npm run android` intentionally skipped even though every automated
   project check passed?
3. Which evidence is still required before recording Android success, and why
   would that evidence say nothing about iOS?

## 2026-07-29 — Temporary free testing strategy

### Decision

- Android development builds are the primary native verification path.
- Web is supplementary for UI and JavaScript-only logic after its SQLite WASM
  bundling setup is added.
- iPhone XR Expo Go is unavailable today because the App Store binary supports
  SDK 54 while PetCare uses SDK 57. PetCare will not be downgraded.
- Apple Developer Program membership, EAS iOS device registration, iOS
  development builds, internal distribution, TestFlight, App Store, and full
  native iOS verification are deferred.
- The existing EAS project remains linked and must not be recreated.

### Audit evidence

- Resolved config reports Expo SDK 57.0.0 and React Native 0.86.0.
- Expo Doctor passes all 20 checks.
- There is no custom native source or custom config plugin.
- Runtime source currently uses Expo Router, Expo Constants, Expo Status Bar,
  Expo SQLite, React Native safe areas, and screens.
- Camera, image picker, document picker, notifications, biometrics, and secure
  storage are not implemented.
- A web export reached Metro but failed to resolve
  `expo-sqlite/web/wa-sqlite/wa-sqlite.wasm`, confirming that web SQLite needs
  its documented WASM/Metro configuration.

### Durable lesson

Expo Go compatibility has two independent gates: its installed native binary
must support the project's Expo SDK, and that binary must include every native
module used by the JavaScript bundle. Passing Expo Doctor or starting Metro
does not prove either gate on a physical iPhone.

### Exercise

Choose one planned native feature and identify which evidence could come from
web, Expo Go, Android development build, and a future signed iOS build.

### Review questions

1. Why can an Expo Go-included library still be unusable on the iPhone XR for
   this project?
2. Why is Android SQLite success not proof of exact iOS SQLite behavior?
3. What additional setup does the current web SQLite import require before web
   can become a reliable supplementary test platform?

## 2026-07-29 — SQLite WASM bundling and repeated Android preflight

### What changed

- Added a minimal Metro configuration that serves `.wasm` files as assets.
- Added COEP `credentialless` and COOP `same-origin` headers to the local Metro
  development server.
- Repeated Android emulator preflight without changing the machine environment
  or creating an AVD.

### Why

Expo SQLite web uses a worker and WebAssembly. Metro must emit the WASM binary,
and the browser must receive cross-origin isolation headers before
`SharedArrayBuffer` is available. Android still requires an ADB-connected
device before `expo run:android` may safely generate and install the native app.

### What you should understand

Bundling, serving, and runtime verification are three separate layers. The web
export now proves that Metro can resolve and emit SQLite's WASM and worker. HTTP
checks prove the local server sends the required headers. They do not prove
that navigation, browser persistence, or console behavior works until a real
browser runs the app.

Likewise, an AVD definition and installed Android SDK packages do not prove a
usable Android target. `adb devices -l` must show `device` before the build and
runtime smoke test can start.

### Verification

- Clean web export: passed; 12 static routes, SQLite worker, and WASM emitted.
- Local web server: HTTP 200 with COEP/COOP headers.
- Browser UI, console, reload, and web SQLite persistence: not verified because
  no browser-control surface was available.
- `Pixel_7_Pro_API_33`: QEMU/WHPX started but exited before ADB registration.
- `Pixel_4_XL_API_33`: remains incomplete.
- Android Gradle, install, runtime, and SQLite persistence: not run.
- iOS: not tested; every Apple workflow remains deferred.

### Your exercise

Run `npm run web`, open the five tabs, reload the page, and record whether the
browser console stays clean and the migration registry remains available.

### Review questions

1. Why does a successful web export not prove that SQLite persistence works?
2. What do COEP and COOP enable for Expo SQLite's web worker?
3. Why is `adb devices -l` a required gate before `npm run android`?

## 2026-07-29 — Permanent Android identity and emulator resource diagnosis

### What changed

- Android package changed from the placeholder `com.example.petcare` to
  `com.hipopotamusss.petcare`.
- Existing Android options were merged rather than replaced.
- The Pixel 7 Pro AVD was cold-booted, wiped after cold boot failed, and given a
  backed-up lower-resource profile.

### Why

An Android application ID becomes the native identity used for installation,
updates, storage sandboxing, and future store distribution. It should be stable
before generating the native project.

The emulator is a separate runtime dependency. Installed SDK packages and a
valid system image do not help when the host lacks enough free memory to keep
QEMU running.

### What you should understand

Expo config resolution, native project generation, Gradle compilation, ADB
installation, and runtime verification are distinct gates. The package ID is
now correct at the first gate. Android native generation deliberately stopped
because the ADB gate remained empty.

The final emulator attempt had only 186 MB free host RAM and recovered to about
900 MB after QEMU exited. WHPX and the API 33 image were available, so resource
headroom—not missing PetCare dependencies—is the strongest supported blocker.

### Verification

- Resolved Android package: `com.hipopotamusss.petcare`.
- Resolved iOS bundle ID remained `com.hipopotamusss.petcare`.
- `Pixel_7_Pro_API_33`: no ADB serial after cold boot, wipe, software GPU, and
  reduced resource profile.
- `Pixel_4_XL_API_33`: directory remains incomplete.
- `adb devices -l`: empty.
- `npm run android`, Gradle, installation, Android runtime, and SQLite
  persistence: not run.
- Web: HTTP 200 and required COEP/COOP headers; rendered UI, console, reload,
  and persistence remain manual because browser control was unavailable.
- iOS: not tested; all Apple workflows remain deferred.

### Your exercise

Connect a physical Android device with USB debugging, run `adb devices -l`, and
explain why `unauthorized` is not sufficient to start the build.

### Review questions

1. Why should the Android package be fixed before generating `android/`?
2. Which evidence separates an SDK configuration problem from host-memory
   pressure?
3. Why can neither a successful web bundle nor an empty ADB list prove Android
   SQLite persistence?
