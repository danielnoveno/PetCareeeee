import type { ExpoConfig, ConfigContext } from 'expo/config';

import { parseAppEnvironment } from './src/validation/environment';

export default ({ config }: ConfigContext): ExpoConfig => {
  const appEnvironment = parseAppEnvironment(process.env.EXPO_PUBLIC_APP_ENV);

  return {
    ...config,
    name: 'PetCare',
    slug: 'petcare',
    version: '0.1.0',
    orientation: 'portrait',
    icon: './assets/images/petcare-icon.png',
    scheme: 'petcare',
    userInterfaceStyle: 'automatic',
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.example.petcare',
    },
    android: {
      package: 'com.example.petcare',
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
      appEnvironment,
    },
  };
};
