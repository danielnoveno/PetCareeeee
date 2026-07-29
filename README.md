# PetCare

PetCare is a local-first React Native application for organizing pet health and
care history. This repository currently contains only Phase 0, Phase 1, and
minimal multi-harness setup. Pet Profile is intentionally not implemented.

## Prerequisites

- Node.js 24 LTS recommended (Expo SDK 57 minimum: Node 22.13)
- npm
- Android Studio, a configured Android SDK, and an Android Emulator
- EAS account only when an approved cloud build is needed

The current machine audit found Node 20.11, Java 8, and no ADB/Emulator in
PATH. See `docs/ENVIRONMENT.md` before installing dependencies.

## Install and verify

After the environment is repaired:

```powershell
Set-Location "D:\PROJECT 2026\PetCare"
npm install
npm run verify
```

Run Android:

```powershell
npm run android
```

Run the development server for an installed development client:

```powershell
npm start
```

After explicit approval and Expo authentication, an iOS cloud build uses:

```powershell
npx eas-cli@latest build --platform ios --profile development
```

No build, submit, deployment, or credential command runs automatically.

## Documentation

- `docs/PRD.md` — product problem, users, value, and safety boundaries
- `docs/MVP.md` — MVP scope and phased delivery
- `docs/ARCHITECTURE.md` — route, database, and platform boundaries
- `docs/TEST_PLAN.md` — automated and manual verification
- `docs/AGENT_SETUP.md` — Codex/OpenCode audit, permissions, update, uninstall
- `docs/LEARNING_LOG.md` — concepts, decisions, and verification reality
