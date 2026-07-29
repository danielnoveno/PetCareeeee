import Constants from 'expo-constants';

import {
  FoundationCard,
  FoundationScreen,
} from '@/components/FoundationScreen';

export default function HomeScreen() {
  const appEnvironment =
    Constants.expoConfig?.extra?.appEnvironment ?? 'development';

  return (
    <FoundationScreen
      title="Fondasi siap diperiksa"
      description="Halaman ini hanya memverifikasi fondasi teknis. Data dan fitur profil hewan belum dibuat."
    >
      <FoundationCard label="Brand" value="PetCare · petcare" />
      <FoundationCard label="Environment" value={String(appEnvironment)} />
      <FoundationCard
        label="Local database"
        value="SQLite aktif dengan migration registry kosong dari tabel fitur."
      />
      <FoundationCard
        label="iOS verification"
        value="Belum diuji pada iPhone fisik atau melalui EAS Build."
        tone="warning"
      />
    </FoundationScreen>
  );
}
