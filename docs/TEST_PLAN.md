# Foundation Test Plan

## Automated

- Environment parser accepts exactly development, preview, and production.
- Environment parser rejects unknown values.
- Database migration versions stay unique and ordered.
- Foundation migration does not create feature tables.
- `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm test`
  compose the local verification command.

## Manual Android checklist

- Start an Android Emulator.
- Run `npm run android`.
- Confirm the app opens without a database error.
- Visit Home, Timeline, Tambah, Documents, and Settings.
- Confirm Home labels the build environment and does not show a pet feature.
- Close and reopen the app to confirm SQLite initialization is idempotent.

## Manual iPhone checklist

- After explicit approval, create an EAS development build.
- Install it on the physical iPhone.
- Run `npm start` and connect the development client.
- Repeat the five-tab and relaunch checks.
- Record device, OS, build profile, and result in `docs/LEARNING_LOG.md`.

No iOS behavior is currently verified.
