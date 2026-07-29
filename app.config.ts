import type { ExpoConfig, ConfigContext } from 'expo/config';

import { parseAppEnvironment } from './src/validation/environment';

export default ({ config }: ConfigContext): ExpoConfig => {
  const appEnvironment = parseAppEnvironment(process.env.EXPO_PUBLIC_APP_ENV);

  return {
    ...config,
    owner: 'hipopotamusss',
    name: 'PetCare',
    slug: 'petcare',
    version: '0.1.0',
    orientation: 'portrait',
    icon: './assets/images/petcare-icon.png',
    scheme: 'petcare',
    userInterfaceStyle: 'automatic',
    ios: {
      ...config.ios,
      supportsTablet: true,
      bundleIdentifier: 'com.hipopotamusss.petcare',
    },
    android: {
      ...config.android,
      package: 'com.hipopotamusss.petcare',
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#F7FBF9',
          image: './assets/images/petcare-icon.png',
          imageWidth: 96,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      ...config.extra,
      appEnvironment,
      eas: {
        ...(config.extra?.eas ?? {}),
        projectId: '2b825c06-1de6-46d1-9842-8b2184735f2e',
      },
    },
  };
};
