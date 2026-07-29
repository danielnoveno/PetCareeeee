export type DatabaseMigration = {
  version: number;
  name: string;
  sql: string;
};

/**
 * Foundation-only migration. Feature tables are intentionally deferred until
 * their feature phase so the schema grows alongside understood requirements.
 */
export const databaseMigrations: readonly DatabaseMigration[] = [
  {
    version: 1,
    name: 'create_schema_migrations',
    sql: `
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL
      );
    `,
  },
];
