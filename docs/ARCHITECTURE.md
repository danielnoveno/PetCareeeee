# Foundation Architecture

## Shape

```text
src/app             Expo Router routes and layouts
src/components      Reusable presentation components
src/constants       Small design tokens
src/database        SQLite bootstrap and ordered migrations
src/validation      Pure validation logic
tests               Foundation business-free tests
```

Expo Router maps files to screens. The root layout initializes SQLite once,
then renders a tab layout. Screens do not call SQLite directly; later feature
modules will own queries and expose focused functions to routes.

## Data direction

```text
Screen -> feature function -> database service -> SQLite
       <- typed result    <-                  <-
```

The database is local-first. Migration 1 creates only the migration registry;
feature tables are introduced with the feature that needs them. Foreign keys
are enabled at connection startup. This keeps schema changes teachable and
avoids designing the whole MVP speculatively.

## Platform boundary

TypeScript and React Native handle shared UI and application logic. Expo
modules provide native capabilities. Native iOS work is introduced one
framework at a time and is only reported successful after an EAS build and a
physical-iPhone test.
