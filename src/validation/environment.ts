export const appEnvironments = [
  'development',
  'preview',
  'production',
] as const;

export type AppEnvironment = (typeof appEnvironments)[number];

export function parseAppEnvironment(value: string | undefined): AppEnvironment {
  const candidate = value ?? 'development';

  if (appEnvironments.includes(candidate as AppEnvironment)) {
    return candidate as AppEnvironment;
  }

  throw new Error(
    `Invalid EXPO_PUBLIC_APP_ENV "${candidate}". Expected: ${appEnvironments.join(', ')}.`,
  );
}
