import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from '@/constants/theme';
import { initializeDatabase } from '@/database';

export default function RootLayout() {
  const [databaseState, setDatabaseState] = useState<
    'loading' | 'ready' | 'error'
  >('loading');

  useEffect(() => {
    initializeDatabase()
      .then(() => setDatabaseState('ready'))
      .catch((error: unknown) => {
        console.error('Database initialization failed.', error);
        setDatabaseState('error');
      });
  }, []);

  if (databaseState !== 'ready') {
    return (
      <SafeAreaProvider>
        <View style={styles.centered}>
          {databaseState === 'loading' ? (
            <ActivityIndicator color={theme.colors.primary} size="large" />
          ) : (
            <Text style={styles.error}>
              PetCare tidak dapat menyiapkan penyimpanan lokal.
            </Text>
          )}
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  error: {
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
});
