# PetCare Cross-Device Handoff

## Repository state

- Workspace: `D:\project-from-pc\PetCare`
- Branch: `main`
- Starting commit: `981c13e6fcbca5d5fce9ddff4d9bbc3609ccd7f0`
- Starting state: `main` matched `origin/main` and the working tree was clean
- Package manager: npm

This is the cloned PetCare repository. Do not run `create-expo-app`, recreate
the project, or replace the existing foundation.

## Product state and safety

PetCare remains at the foundation stage. The five navigation routes are
placeholders and SQLite contains only migration infrastructure. Pet Profile is
not implemented.

PetCare is not a diagnostic tool. It must not infer diagnoses or medication
doses. Original medical documents must be preserved, and extracted information
must remain an unconfirmed draft until the user reviews it.

## Platform verification state

PetCare currently uses this temporary free testing strategy:

1. Android development builds are the primary full-native test platform.
2. Web is supplementary for UI and non-native business logic. Its SQLite WASM
   bundle and local COEP/COOP headers are configured, but browser runtime and
   persistence still require manual verification.
3. Expo Go on the physical iPhone XR is unavailable for this project today:
   the App Store Expo Go supports SDK 54 while PetCare uses SDK 57.
4. Full iOS verification is deferred until an active paid Apple Developer
   Program membership is available.

Android and web results must not be reported as iOS verification.

## Device-specific environment

- Current device: [New device environment](environments/NEW-DEVICE.md)
- Previous device: [Old PC environment](environments/OLD-PC.md)

`docs/ENVIRONMENT.md` is now an index. Its historical content came from the
old PC and uses paths such as `D:\flutter\sdk`; those paths do not describe
this device.

Current-device facts:

- Node.js is 22.14.0 and satisfies the project requirement `>=22.13.0`.
- Expo SDK is 57.0.0 and React Native is 0.86.0.
- `ANDROID_HOME` is `D:\Android\sdk`.
- JDK 17.0.12 is available at `C:\Program Files\Java\jdk-17`.
- Java 8 remains earlier in the original PATH.
- Android Platform 36 and stable Build-Tools 36.0.0 were initially missing and
  are now installed.
- Environment corrections for Android commands are process-local only.
- The local project is linked to `@hipopotamusss/petcare`, project ID
  `2b825c06-1de6-46d1-9842-8b2184735f2e`; do not create another EAS project.

## Apple and iOS status

- Expo login and EAS project linking are complete.
- Apple ID login and 2FA succeeded, but the account has no Apple Developer
  Team.
- `eas device:create` is blocked by the missing Apple Developer Program
  membership; no iPhone is registered.
- iOS development builds, internal distribution, native signing and
  provisioning, TestFlight, App Store submission, and standalone installation
  are deferred. TestFlight is not a free workaround.
- Expo Go is only a temporary UI/functional option when its App Store SDK
  matches the project. It cannot load this SDK 57 project while the store
  binary supports SDK 54.
- No iOS behavior is currently verified.

## Agent tooling

- Codex is the primary writer.
- OpenCode is installed as an independent read-only reviewer.
- `.agents/skills/petcare-review/SKILL.md` and
  `.agents/skills/petcare-learning-coach/SKILL.md` are the canonical shared
  skills.
- The OpenCode reviewer and `/petcare-review` command are thin read-only
  adapters.
- No PetCare project hook or MCP server is enabled.
- An unrelated global Blender MCP entry exists but is not used by PetCare.
- ECC, Ruflo, Ponytail, and Agent Orchestrator remain uninstalled.

Only one harness may write to the working tree at a time. Run `git status` and
`git diff` before switching harnesses.

## Completed environment steps

- JDK 17 and Android paths were used only in child PowerShell processes.
- Java 17.0.12, Javac 17.0.12, ADB 35.0.2, and Emulator 35.1.20 were verified.
- Only `platforms;android-36` and `build-tools;36.0.0` were installed.
- Required `android.jar` and `aapt2.exe` checks returned `True`.
- Expo dependency compatibility, Expo Doctor 20/20, TypeScript, ESLint,
  Prettier, two Jest suites, seven tests, and `git diff --check` passed.

## Android runtime status

Android remains blocked before Gradle because no AVD has reached ADB state
`device`. This is an environment/runtime blocker, not evidence of a source
failure.

- The resolved Android package is now `com.hipopotamusss.petcare`.
- `Pixel_7_Pro_API_33` exited before ADB registration during normal, cold-boot,
  software-rendered, and constrained-memory attempts.
- A cold boot failed, so the user-approved AVD-only wipe was performed. It
  erased only Pixel 7 Pro emulator data and did not touch a physical device.
- The AVD resource profile was backed up, then reduced to 2 cores, 1536 MB RAM,
  1080x2340 resolution, and software GPU.
- Stale locks from failed launches were moved to recoverable `.stale-*` names
  within the existing AVD.
- WHPX and the API 33 Play Store system image are present. The final launch had
  only 186 MB free host RAM and recovered to about 900 MB after QEMU exited;
  insufficient host-memory headroom is the strongest supported blocker.
- `Pixel_4_XL_API_33` is incomplete: its referenced AVD directory has no
  readable configuration or usable system path.
- `adb devices -l` remained empty.
- `npm run android` was not run.
- The ignored local `android/` directory was not generated.
- Gradle, app installation, and every smoke-test item remain unverified.

## Web status

- `metro.config.js` adds `.wasm` asset handling and local development-server
  COEP/COOP headers.
- `npx expo export --platform web` succeeds and emits the SQLite WASM asset and
  worker bundle.
- `npm run web` serves the root with HTTP 200,
  `Cross-Origin-Embedder-Policy: credentialless`, and
  `Cross-Origin-Opener-Policy: same-origin`.
- Browser automation was unavailable in the verification session. Navigation,
  browser console, reload behavior, and IndexedDB-backed SQLite persistence
  remain manual checks.
- Expo SQLite web support is alpha. Production hosting must provide the same
  COEP/COOP headers; the Metro configuration only covers the local server.

## Current testing next steps

1. Prefer a physical Android device with USB debugging, or close memory-heavy
   user applications before retrying `Pixel_7_Pro_API_33`.
2. Require `adb devices -l` to report one target as `device`, then run
   `npm run android`. The command will generate the ignored local `android/`
   directory before building.
3. Run `npm run web` and manually verify the five tabs, browser console, reload,
   and SQLite persistence.
4. Recheck the official Expo Go supported SDK before trying
   `npx expo start --go` on iPhone XR. Do not downgrade PetCare to match Expo
   Go.
5. Resume iOS registration and build work only after Apple Developer Program
   membership is active.

## Safety boundaries

Do not:

- persist environment changes, remove Java 8, or change machine `JAVA_HOME`;
- install Android packages other than the two explicitly approved packages;
- create a new AVD;
- run `npm audit fix --force`;
- install ECC, Ruflo, Ponytail, or Agent Orchestrator;
- add hooks or MCP servers;
- implement Pet Profile;
- run an iOS EAS Build, EAS Submit, TestFlight, or App Store workflow while
  Apple Developer Program membership is deferred;
- commit before the build and smoke test are complete;
- push;
- claim iOS verification.
