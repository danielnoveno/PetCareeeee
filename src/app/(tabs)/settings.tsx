import {
  FoundationCard,
  FoundationScreen,
} from '@/components/FoundationScreen';

export default function SettingsScreen() {
  return (
    <FoundationScreen
      title="Settings"
      description="Permission, privacy, export, dan backup akan ditambahkan satu per satu."
    >
      <FoundationCard
        label="Privacy baseline"
        value="Local-first; tidak ada secret atau cloud sync."
      />
    </FoundationScreen>
  );
}
