# New Device Environment — 2026-07-29

## Device identity

| Item      | Verified value                                             |
| --------- | ---------------------------------------------------------- |
| Workspace | `D:\project-from-pc\PetCare`                               |
| Branch    | `main`                                                     |
| Commit    | `981c13e6fcbca5d5fce9ddff4d9bbc3609ccd7f0`                 |
| Git state | `main` matched `origin/main`; working tree initially clean |
| Node.js   | 22.14.0                                                    |
| npm       | 10.8.3                                                     |
| Project   | PetCare foundation                                         |

The repository was cloned from Git on this device. Do not recreate or replace
it with `create-expo-app`.

## Java audit

- Process and user `JAVA_HOME` point to `C:\Program Files\Java\jdk-17`.
- `java.exe` and `javac.exe` under `JAVA_HOME` are version 17.0.12.
- The default `java` selected by the original PATH is Java 8.0.401 because
  Oracle Java shims occur earlier in PATH.
- Machine `JAVA_HOME` points to an older JDK 11 installation.
- No persistent environment value was changed, Java 8 was not removed, and
  machine `JAVA_HOME` was not changed.
- Native Android commands use a process-local PATH with JDK 17 first.

## Android SDK audit

| Component           | Verified value or state                   |
| ------------------- | ----------------------------------------- |
| `ANDROID_HOME`      | `D:\Android\sdk`                          |
| ADB                 | 35.0.2 at `platform-tools\adb.exe`        |
| Emulator            | 35.1.20 at `emulator\emulator.exe`        |
| Command-line tools  | 16.0 at `cmdline-tools\latest\bin`        |
| Available AVDs      | `Pixel_7_Pro_API_33`, `Pixel_4_XL_API_33` |
| Android Platform 36 | Installed; `android.jar` verified         |
| Build-Tools 36.0.0  | Installed; `aapt2.exe` verified           |

Only these SDK packages are approved for installation:

- `platforms;android-36`
- `build-tools;36.0.0`

No other Android package may be installed and no new AVD may be created.

The two approved packages were installed with command-line tools 16.0 and a
process-local JDK 17 PATH. The initial command wrapper timed out after two
minutes, but its JDK 17 child process completed normally. No other package was
requested. Both required artifact checks then returned `True`.

## Project verification

Reported as completed on this device before this handoff:

- `npm ci`

Repeated after SDK installation:

- `npx expo install --check`: dependencies are up to date
- `npx expo-doctor`: 20 of 20 checks passed
- `npm run verify`: TypeScript, ESLint, Prettier, and tests passed
- Jest: two suites and seven tests passed
- `git diff --check`: passed

The first verification run found a Prettier warning only in this newly created
document. The four new/moved environment documents were formatted, and the
complete verification sequence then passed.

## First Android build

Blocked before Gradle. Android and iOS have not been successfully tested on
this device. A repeated 2026-07-29 run again failed to reach ADB state
`device`.

Resolved Android package: `com.hipopotamusss.petcare`.

### Emulator evidence

- `Pixel_7_Pro_API_33` initially left stale AVD lock files and reported
  `It seems too many emulator instances are running on this machine`.
- No emulator or QEMU process was active when those locks were inspected.
- The stale locks were moved to recoverable `.stale-20260729-*` names inside
  the same AVD; they were not deleted.
- A normal retry, cold boot with software rendering, and a final constrained
  1536 MB launch all exited before registering an ADB serial.
- After cold boot failed, `-wipe-data` was used only on
  `Pixel_7_Pro_API_33`. Existing emulator data was erased as authorized; no
  physical device was touched.
- The original AVD `config.ini` was copied to
  `config.ini.backup-20260729-213009`. The active AVD was reduced to 2 CPU
  cores, 1536 MB RAM, 1080x2340 resolution, and `swiftshader_indirect`.
- Host acceleration reported WHPX as installed and usable.
- The repeated run had approximately 2.7 GB free host memory. QEMU still raised
  the Pixel 7 Pro guest allocation to 3 GB and exited before ADB registration,
  so low headroom remains a plausible contributor rather than a proven cause.
- Host free memory during diagnosis was approximately 1.5 GB while the AVD
  configuration requested or raised guest RAM to 3 GB. This is evidence of
  resource pressure, not a proven sole cause.
- On the final reduced-profile attempt, host free memory fell to 186 MB before
  QEMU exited, then recovered to about 900 MB. With the API 33 system image and
  WHPX both available, inadequate host-memory headroom is the strongest
  supported current blocker.
- `Pixel_4_XL_API_33` could not be used because its referenced AVD directory
  lacked a readable `config.ini`; the emulator reported that it could not find
  the AVD system path.
- `adb devices -l` remained empty; no device reached `device` or `offline`.

### Gradle and smoke test

`npm run android` was not run because the required ADB `device` state was not
met. Consequently:

- no Gradle result exists;
- the app was not installed or launched;
- display name, icon, splash, Home, environment check, tabs, SQLite bootstrap,
  Metro state, red-screen state, and close/reopen behavior remain unverified.
- the ignored local `android/` directory was not generated.

## Exact next steps

1. Prefer connecting a physical Android device and accepting its USB debugging
   prompt, or close memory-heavy user applications before retrying the AVD.
2. Run `D:\Android\sdk\platform-tools\adb.exe devices -l`.
3. Require exactly `device`, not an empty, offline, or unauthorized state.
4. Only then run `npm run android`.
5. Complete and record the foundation runtime and persistence smoke test.

## Verification boundary

Android results do not establish iOS behavior. iOS remains untested until an
approved iOS build and physical-device verification are completed.

## Temporary free testing strategy — 2026-07-29

- The EAS project is linked to `@hipopotamusss/petcare`, project ID
  `2b825c06-1de6-46d1-9842-8b2184735f2e`.
- Apple ID authentication and 2FA succeeded, but no Apple Developer Team is
  available.
- Apple Developer Program membership, iPhone registration, iOS development
  builds, internal distribution, TestFlight, App Store, and full native iOS
  verification are deferred.
- No iPhone was registered and no iOS build was run.
- PetCare uses Expo SDK 57. The current iPhone App Store Expo Go supports SDK
  54 only, so the SDK 57 project cannot be opened on the physical iPhone XR
  through Expo Go. Do not downgrade the project.
- Android development builds are the temporary primary native verification
  path.
- Web is supplementary. Expo SQLite WASM bundling and local cross-origin
  headers are now configured; browser runtime checks remain outstanding.

## Web SQLite setup — 2026-07-29

- `metro.config.js` treats `.wasm` as a Metro asset.
- The local Expo server adds COEP `credentialless` and COOP `same-origin` so
  `SharedArrayBuffer` is available in a compatible browser context.
- A clean web export succeeded and emitted the Expo SQLite WASM file plus its
  worker bundle.
- The local root returned HTTP 200 with both required headers.
- Browser automation was unavailable, so rendered navigation, console health,
  reload, and SQLite persistence are not yet verified.
- Expo SQLite web support remains alpha. A production host must configure the
  same headers independently.
