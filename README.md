# PetCare

PetCare is a local-first React Native application for organizing pet health and
care history. This repository currently contains only Phase 0, Phase 1, and
minimal multi-harness setup. Pet Profile is intentionally not implemented.

## Prerequisites

- Node.js 22.13 or newer
- npm
- Android Studio and a configured Android device or emulator for primary
  full-native testing
- EAS account only for approved cloud workflows

The current Windows device uses Node 22.14.0. See `docs/ENVIRONMENT.md` for
device-specific Java, Android SDK, and platform limitations.

## Install and verify

```powershell
Set-Location "D:\project-from-pc\PetCare"
npm run verify
```

Android development builds are the primary native testing path. The following
command invokes `expo run:android`; because this repository has no native
folder, its first approved run will generate an ignored local `android/`
directory before building:

The permanent Android application ID is `com.hipopotamusss.petcare`.

```powershell
npm run android
```

Do not run it until a working Android device/emulator and native-folder
generation are approved.

Expo Go on iPhone must be targeted explicitly:

```powershell
npx expo start --go
```

Use `npx expo start --go --tunnel` only if LAN discovery fails. The current App
Store Expo Go supports SDK 54 while PetCare uses SDK 57, so the physical iPhone
XR cannot currently open this project. Do not downgrade PetCare.

Run web with:

```powershell
npm run web
```

Web is supplementary. `metro.config.js` registers SQLite's WASM asset and adds
the COEP/COOP headers required by `SharedArrayBuffer` on the local Expo server.
Expo SQLite web support remains alpha, so browser persistence and console
behavior must still be checked manually.

Run Metro for an already installed development client with:

```powershell
npm start
```

The EAS project is already linked. iOS device registration, development builds,
internal distribution, TestFlight, and App Store workflows are deferred until
an active Apple Developer Program membership is available. No build, submit,
deployment, or credential command runs automatically.

## Documentation

- `docs/PRD.md` — product problem, users, value, and safety boundaries
- `docs/MVP.md` — MVP scope and phased delivery
- `docs/ARCHITECTURE.md` — route, database, and platform boundaries
- `docs/TEST_PLAN.md` — automated and manual verification
- `docs/AGENT_SETUP.md` — Codex/OpenCode audit, permissions, update, uninstall
- `docs/LEARNING_LOG.md` — concepts, decisions, and verification reality
