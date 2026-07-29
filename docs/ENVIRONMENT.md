# Environment Audit — 2026-07-29

| Component          | Observed                                 | Foundation requirement              | Status       |
| ------------------ | ---------------------------------------- | ----------------------------------- | ------------ |
| Windows            | Windows 11 (user-provided)               | Supported by Expo                   | Ready        |
| Node.js            | 20.11.0                                  | Expo SDK 57 requires 22.13.x+       | Blocked      |
| npm                | 10.2.4                                   | npm package manager                 | Available    |
| Git                | 2.43.0.windows.1                         | Git available                       | Ready        |
| Android Studio     | Installed under `C:\Program Files`       | Android IDE available               | Installed    |
| Java               | PATH selects Oracle Java 8u501, x86 shim | Android Studio bundled JBR exists   | Needs repair |
| ADB                | Not found in PATH                        | Android SDK platform-tools          | Blocked      |
| Emulator           | Not found in PATH                        | Android emulator command            | Blocked      |
| Android env        | `ANDROID_HOME`/`ANDROID_SDK_ROOT` absent | SDK path configured                 | Blocked      |
| Codex CLI          | 0.146.0                                  | CLI available                       | Installed    |
| OpenCode CLI       | 1.18.9                                   | CLI available                       | Installed    |
| Drive D free space | 115.14 GB                                | Sufficient for project dependencies | Ready        |

No environment component was installed or changed automatically. Recommended
repair is Node 24 LTS, followed by a documented Android Studio/JDK/SDK PATH
review. Those machine-level changes require a separate approved step.

## Verification blockers

- `npm run verify` stops at typecheck because project dependencies are not
  installed and `tsc` is unavailable.
- The lockfile was created with lifecycle scripts disabled. npm confirmed the
  Node engine mismatch.
- `npm audit --omit=dev` reports 21 transitive advisories. Its suggested
  `--force` resolution downgrades core Expo/React Native packages, so no
  automatic fix was applied.
- Android runtime verification cannot start until ADB, Emulator, SDK paths,
  and a suitable JDK are available.
- The active workspace folder is locked by its host process, so renaming it to
  the required repository folder is pending a workspace restart.

## Proposed repair — requires user approval

### Node

Use the official Node.js 24 LTS Windows x64 installer. It will replace or update
the executable under `C:\Program Files\nodejs`, update machine PATH entries,
and include a newer npm. Before running it, record the current Node/npm paths
and versions, npm prefix/config locations, global package list, and user/machine
PATH to a timestamped backup outside this repository. Then install, restart the
terminal, verify versions and paths, run `npm ci`, and run `npm run verify`.

The existing installation method could not be identified from the uninstall
registry. A read-only Winget query stopped at Microsoft Store source agreements;
no agreement was accepted and no package changed.

### Android

Android Studio and its bundled JBR are present, but the SDK is not at the
default user location and the shell selects an obsolete Java shim. First use
Android Studio's SDK Manager to locate or install SDK Platform 36,
platform-tools, build-tools, and Emulator. Before changing environment
variables, back up user/machine PATH plus any existing `JAVA_HOME`,
`ANDROID_HOME`, and `ANDROID_SDK_ROOT` values. Proposed user-level changes are:

- point `JAVA_HOME` to Android Studio's bundled JBR;
- set `ANDROID_HOME` to the confirmed SDK directory;
- add the confirmed `platform-tools` and `emulator` directories to user PATH.

No Android installer, SDK package, environment variable, or PATH entry was
changed in this session.
