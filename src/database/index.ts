import * as SQLite from 'expo-sqlite';

import { databaseMigrations } from './migrations';

const databaseName = 'petcare.db';

export async function initializeDatabase(): Promise<void> {
  const database = await SQLite.openDatabaseAsync(databaseName);

  await database.execAsync('PRAGMA foreign_keys = ON;');

  for (const migration of databaseMigrations) {
    await database.withTransactionAsync(async () => {
      await database.execAsync(migration.sql);

      const applied = await database.getFirstAsync<{ version: number }>(
        'SELECT version FROM schema_migrations WHERE version = ?',
        migration.version,
      );

      if (!applied) {
        await database.runAsync(
          'INSERT INTO schema_migrations (version, name, applied_at) VALUES (?, ?, ?)',
          migration.version,
          migration.name,
          new Date().toISOString(),
        );
      }
    });
  }
}
