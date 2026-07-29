# Foundation Test Plan

## Automated

- Environment parser accepts exactly development, preview, and production.
- Environment parser rejects unknown values.
- Database migration versions stay unique and ordered.
- Foundation migration does not create feature tables.
- `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm test`
  compose the local verification command.

## Temporary platform strategy

- Primary native testing: Android development build.
- iPhone XR UI preview: Expo Go only when its App Store SDK matches PetCare.
  It currently does not: Expo Go supports SDK 54 and PetCare uses SDK 57.
- Supplementary testing: web for UI and non-native logic. SQLite WASM bundling
  is configured; runtime persistence remains an alpha-platform check.
- Deferred: all signed or standalone iOS workflows until Apple Developer
  Program membership is active.

## Compatibility matrix

| Feature/dependency                 | Expo Go iOS     | Expo Go Android                    | Android development build | Web                 | Native build required                      | Notes                                                                                                            |
| ---------------------------------- | --------------- | ---------------------------------- | ------------------------- | ------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| React and React Native core        | Unsupported     | Needs physical-device verification | Supported                 | Partially supported | Yes for native parity                      | iPhone is blocked by SDK mismatch; web uses React Native Web.                                                    |
| Expo Router/navigation             | Unsupported     | Needs physical-device verification | Supported                 | Supported           | No for basic routing                       | Router is included in compatible Expo Go, but iPhone cannot load SDK 57.                                         |
| SQLite/local database              | Unsupported     | Needs physical-device verification | Supported                 | Partially supported | Yes for production-like native persistence | Included in compatible Expo Go. Web is alpha; WASM bundling works, while runtime persistence needs verification. |
| Expo Constants/environment config  | Unsupported     | Needs physical-device verification | Supported                 | Supported           | No                                         | `appEnvironment` is JavaScript-accessible config; current default is development.                                |
| Expo Linking/deep links            | Unsupported     | Partially supported                | Supported                 | Partially supported | Yes for custom scheme/app links            | Expo Go uses `exp://`; it cannot prove the `petcare://` native scheme or universal links.                        |
| Splash screen, icon, and app name  | Unsupported     | Partially supported                | Partially supported       | Partially supported | Yes                                        | Expo Go cannot prove native branding; release build is required for exact splash parity.                         |
| Status bar, safe area, and screens | Unsupported     | Needs physical-device verification | Supported                 | Partially supported | Yes for native parity                      | Packages are standard Expo/React Native dependencies; web behavior is browser-based.                             |
| `expo-dev-client`                  | Unsupported     | Unsupported                        | Supported                 | Not implemented     | Yes                                        | Development client is a separate native runtime, not a feature inside Expo Go.                                   |
| Local network/Metro                | Unsupported     | Needs physical-device verification | Supported                 | Supported           | No                                         | iPhone Expo Go is SDK-blocked; Android connection still needs runtime verification.                              |
| Config plugins                     | Unsupported     | Unsupported                        | Supported                 | Partially supported | Yes                                        | `expo-router` and `expo-splash-screen` plugins affect generated native projects; Expo Go native code is fixed.   |
| Document/file handling             | Not implemented | Not implemented                    | Not implemented           | Not implemented     | Not implemented                            | No document picker or file-system dependency or source usage exists.                                             |
| Image picker/camera                | Not implemented | Not implemented                    | Not implemented           | Not implemented     | Not implemented                            | No dependency or source usage exists.                                                                            |
| Notifications                      | Not implemented | Not implemented                    | Not implemented           | Not implemented     | Not implemented                            | No dependency, permission, or entitlement exists.                                                                |
| Biometrics                         | Not implemented | Not implemented                    | Not implemented           | Not implemented     | Not implemented                            | No local-authentication dependency exists.                                                                       |
| Secure storage                     | Not implemented | Not implemented                    | Not implemented           | Not implemented     | Not implemented                            | No secure-store dependency exists.                                                                               |

## Manual Android checklist

- Use an approved working Android emulator or physical device.
- Confirm resolved package `com.hipopotamusss.petcare`.
- Require `adb devices -l` to report the target as `device`; do not build for
  empty, offline, or unauthorized output.
- Approve generation of the ignored local `android/` directory before the
  first `npm run android`; the command invokes prebuild automatically.
- Confirm the app opens without a database error.
- Visit Home, Timeline, Tambah, Documents, and Settings.
- Confirm Home labels the build environment and does not show a pet feature.
- Close and reopen the app to confirm SQLite initialization is idempotent.

## Expo Go iPhone checklist

Do not run this checklist while the App Store Expo Go SDK differs from the
project SDK. When compatible:

- Run `npx expo start --go`.
- Use `npx expo start --go --tunnel` only if LAN fails.
- Verify iPhone XR layout, safe areas, navigation, forms, visual state, and
  JavaScript-only behavior.
- Do not record Expo Go results as full native iOS verification.

## Web checklist

- Run `npm run web`.
- Confirm the response includes COEP `credentialless` and COOP `same-origin`.
- Verify basic UI, responsive layout, routes, form validation, and pure
  business logic.
- Reload after SQLite initialization and confirm the migration registry remains
  available.
- Do not use web results to claim native SQLite, permissions, deep links,
  background behavior, or mobile performance.
- Verified so far: static export, SQLite WASM/worker emission, local HTTP 200,
  and required local cross-origin headers.
- Still manual: rendered tabs, browser console, reload, and SQLite persistence.

## Deferred iOS checklist

- iOS development build and signing
- device registration and provisioning
- native permission and entitlement behavior
- exact SQLite behavior on iOS
- background behavior and production performance
- internal distribution, TestFlight, App Store, and standalone installation

No iOS behavior is currently verified. TestFlight also requires an active
Apple Developer Program membership and is not a free workaround.
