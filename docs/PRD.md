# PetCare Product Requirements

## Product summary

PetCare is a local-first mobile app that organizes a pet's health and care
history chronologically. It brings profiles, symptoms, vet visits, vaccines,
medications, weight records, reminders, and original supporting documents into
one understandable timeline.

Value proposition:

> Semua riwayat kesehatan hewan, dari buku vaksin hingga kunjungan dokter,
> tersusun dalam satu timeline.

## User problem

Pet-care information is fragmented across physical health books, vaccination
cards, receipts, prescriptions, chat messages, photo galleries, alarms,
calendars, private notes, and memory. This makes schedules easy to miss,
documents easy to lose, and a complete history difficult to explain to a new
veterinarian or another caregiver.

## Target users

- Dog and cat owners, including households with multiple pets
- Couples or families sharing care
- Owners of senior pets or pets with recurring medication
- Foster carers and rescuers

## Product principles

- Local-first and usable without clinic integration
- Manual entry always remains available
- Original photos and PDFs are retained
- OCR output is a draft that requires user confirmation
- Ambiguous extracted fields are visibly marked for review
- Privacy, clear data ownership, and recoverability come before automation

## Inputs and core information

Users may add information manually or attach camera images, gallery images,
PDFs, health-book scans, vaccination cards, receipts, and prescriptions.
Records may cover pet identity, symptoms, visits, vaccines, medicines,
administration logs, weight, costs, follow-up dates, and source documents.

## Safety and non-goals

The MVP is not a diagnosis tool, veterinarian replacement, medical-dose
calculator, clinic administration system, marketplace, payment platform,
social network, or official clinic medical record. PetCare must not guess a
diagnosis or dose.

## Document extraction policy

1. The original document is preserved.
2. Extracted text remains linked to its source.
3. The user confirms every extracted field before it becomes trusted data.
4. Confidence is communicated as `Terbaca jelas`, `Perlu diperiksa`, or
   `Belum terbaca`.
5. Failed extraction never blocks manual entry.

## Foundation acceptance criteria

- PetCare naming and identifiers are consistent.
- The app opens to five foundation tabs with no business feature implemented.
- Local SQLite initializes only migration infrastructure.
- TypeScript, lint, formatting, tests, and CI have explicit commands.
- Development, preview, and production build profiles are documented.
- Android and iOS verification claims remain separate.
