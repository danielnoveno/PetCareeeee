import {
  FoundationCard,
  FoundationScreen,
} from '@/components/FoundationScreen';

export default function AddScreen() {
  return (
    <FoundationScreen
      title="Tambah"
      description="Entry point ini sengaja belum menyediakan form agar scope foundation tetap terjaga."
    >
      <FoundationCard
        label="Status"
        value="Placeholder — input fitur ditunda."
      />
    </FoundationScreen>
  );
}
