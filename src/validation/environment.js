const appEnvironments = ['development', 'preview', 'production'];

/**
 * @typedef {'development' | 'preview' | 'production'} AppEnvironment
 */

/**
 * @param {string | undefined} value
 * @returns {AppEnvironment}
 */
function parseAppEnvironment(value) {
  const candidate = value ?? 'development';

  if (appEnvironments.includes(candidate)) {
    return /** @type {AppEnvironment} */ (candidate);
  }

  throw new Error(
    `Invalid EXPO_PUBLIC_APP_ENV "${candidate}". Expected: ${appEnvironments.join(', ')}.`,
  );
}

module.exports = {
  appEnvironments,
  parseAppEnvironment,
};
