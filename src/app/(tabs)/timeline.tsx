import {
  FoundationCard,
  FoundationScreen,
} from '@/components/FoundationScreen';

export default function TimelineScreen() {
  return (
    <FoundationScreen
      title="Timeline"
      description="Rute foundation tersedia; event dan filter baru akan dibuat pada Phase 3."
    >
      <FoundationCard
        label="Status"
        value="Placeholder — belum ada data bisnis."
      />
    </FoundationScreen>
  );
}
