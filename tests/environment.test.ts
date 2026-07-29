import { parseAppEnvironment } from '../src/validation/environment';

describe('parseAppEnvironment', () => {
  it('defaults to development', () => {
    expect(parseAppEnvironment(undefined)).toBe('development');
  });

  it.each(['development', 'preview', 'production'] as const)(
    'accepts %s',
    (value) => {
      expect(parseAppEnvironment(value)).toBe(value);
    },
  );

  it('rejects unknown environments', () => {
    expect(() => parseAppEnvironment('staging')).toThrow(
      'Invalid EXPO_PUBLIC_APP_ENV',
    );
  });
});
