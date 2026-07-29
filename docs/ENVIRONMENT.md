# Environment Audit — 2026-07-29

## Verified environment

| Component          | Verified value                                    | Status    |
| ------------------ | ------------------------------------------------- | --------- |
| Node.js            | 24.18.0 at `C:\Program Files\nodejs\node.exe`     | Ready     |
| npm                | 11.16.0 at `C:\Program Files\nodejs\npm.cmd`      | Ready     |
| Java for Gradle    | OpenJDK 17.0.11 from Android Studio's bundled JBR | Ready     |
| `JAVA_HOME`        | `C:\Program Files\Android\Android Studio\jbr`     | Ready     |
| Android SDK        | `D:\flutter\sdk`                                  | Ready     |
| `ANDROID_HOME`     | `D:\flutter\sdk`                                  | Ready     |
| ADB                | 35.0.2 in `D:\flutter\sdk\platform-tools`         | Ready     |
| Emulator           | 35.1.20 in `D:\flutter\sdk\emulator`              | Ready     |
| Command-line tools | 16.0 in `D:\flutter\sdk\cmdline-tools\latest\bin` | Ready     |
| Android AVD        | `Pixel_7_API_33`                                  | Available |

The active Node installation is the Winget package `OpenJS.NodeJS.LTS`
24.18.0. The previous `OpenJS.NodeJS.20` package is no longer registered after
the successful upgrade, but its files were backed up before the change.

The SDK contains Android platforms 31, 33, 34, and 35 plus Build-Tools 30.0.3,
33.0.1, and 35.0.0. Expo SDK 57 targets Android API 36. Android SDK Platform 36
and Build-Tools 36.x are not installed yet. No SDK package was installed and no
Android build was attempted during this stage.

## Backup

The pre-change environment backup is stored outside the repository at:

`D:\PROJECT 2026\agent-toolbox\backups\petcare-environment-20260729-145232`

It contains user and machine environment registry exports, a PowerShell
environment snapshot, npm configuration and global-package data, and a copy of
the previous Node 20.11.0 installation.

The official Node 24.18.0 Windows x64 archive and checksum file are retained at:

`D:\PROJECT 2026\agent-toolbox\downloads\node-v24.18.0`

The archive checksum was verified before use. A separately extracted and
verified portable copy remains at `D:\dev\node-v24.18.0-win-x64`.

## Configuration changes

Only user-level environment values were changed:

- `JAVA_HOME` was set after verifying the exact bundled JBR path and Java
  version.
- `ANDROID_HOME` was set after locating the actual SDK.
- `platform-tools`, `emulator`, and `cmdline-tools\latest\bin` were appended to
  user PATH once, without duplicates.

`ANDROID_SDK_ROOT` and `STUDIO_JDK` remain unset. Machine environment values
were not changed, Java 8 was not removed, and `setx PATH` was not used. A newly
opened terminal is required to inherit the persisted user environment. Gradle
uses `JAVA_HOME`; the verification shell explicitly placed its `bin` directory
first so `java -version` selected JBR 17 instead of the older machine Java
shim.

## Project verification

Dependencies were installed from `package-lock.json` with `npm ci`. The checks
were rerun before the first Android verification attempt and passed:

- `npx expo install --check`: dependencies are up to date.
- `npx expo-doctor`: 20 of 20 checks passed.
- `npm run verify`: TypeScript, ESLint, Prettier, and all 7 Jest tests passed.

The dependency check required the declared `expo-linking` peer dependency.
ESLint was aligned with Expo's supported major version, and the TypeScript
import resolver was declared directly. npm reports 43 transitive audit
findings (11 moderate and 32 high); no forced audit fix was run.

## First Android verification attempt

The read-only preflight produced these results:

- `platforms\android-36` is absent.
- No `build-tools\36.x` directory is installed.
- SDK Manager lists the stable packages `platforms;android-36` and
  `build-tools;36.0.0` as available.
- The existing AVD `Pixel_7_API_33` is available; no new AVD was created.
- `adb devices -l` started the ADB daemon successfully but listed no device or
  emulator.
- `npx expo install --check` reports dependencies are up to date.
- `npx expo-doctor` passes all 20 checks.
- `npm run verify` passes TypeScript, ESLint, Prettier, and all 7 Jest tests.

The current Codex shell was opened before the persisted user environment
changes and still selects the legacy Java 8 shim. The SDK catalog was therefore
queried with a process-local reference to the already verified Android Studio
JBR 17. No persisted Java, Node, Android, or PATH value was changed.

Installation requires approval before running:

```powershell
sdkmanager "platforms;android-36" "build-tools;36.0.0"
```

The Android build was not started because both required SDK packages are
missing and the emulator is not connected. Consequently, Gradle completion,
app installation and launch, navigation placeholder behavior, the environment
check page, and Metro's red-error state have not yet been manually verified.

## Repository path

`Get-Location` confirms the active workspace is now
`D:\PROJECT 2026\PetCare`. The former `ios-app-1` name is retained here only as
historical context for the completed rename; it is no longer an active path or
instruction.
