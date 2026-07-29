import { databaseMigrations } from '../src/database/migrations';

describe('foundation database migrations', () => {
  it('uses unique, ascending migration versions', () => {
    const versions = databaseMigrations.map(({ version }) => version);
    const sortedVersions = [...versions].sort((left, right) => left - right);

    expect(versions).toEqual(sortedVersions);
    expect(new Set(versions).size).toBe(versions.length);
  });

  it('does not create feature tables during foundation', () => {
    const sql = databaseMigrations
      .map(({ sql: statement }) => statement)
      .join(' ');

    expect(sql).toContain('schema_migrations');
    expect(sql).not.toMatch(/\b(pets|pet_events|vet_visits|medications)\b/i);
  });
});
