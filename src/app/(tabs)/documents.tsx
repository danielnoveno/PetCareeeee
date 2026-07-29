import {
  FoundationCard,
  FoundationScreen,
} from '@/components/FoundationScreen';

export default function DocumentsScreen() {
  return (
    <FoundationScreen
      title="Documents"
      description="Penyimpanan foto, PDF, dan hasil scan dimulai pada fase dokumen."
    >
      <FoundationCard
        label="Status"
        value="Placeholder — belum meminta permission file."
      />
    </FoundationScreen>
  );
}
