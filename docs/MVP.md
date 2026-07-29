# PetCare MVP Scope

## Included capabilities

### Pet profiles

Multiple dog or cat profiles can be created, edited, archived, and used to
filter a timeline. Planned data includes name, photo, species, breed, sex,
birth date or estimated age, color, weight, sterilization status, allergies,
special conditions, optional microchip number, and notes.

### Timeline and visits

The timeline supports vet visits, vaccines, medicines, medication logs,
symptoms, weight, lab results, food, grooming, and general notes. An event can
carry a date, title, description, clinic, doctor, cost, attachments, source
document, and follow-up reminder.

### Documents

Users can attach photos and PDFs for vaccination books, health books, receipts,
prescriptions, lab results, medical letters, medicine packaging, and other
records. Original files can be opened even when OCR is unavailable.

### Reminders and medication logs

Reminders cover medication, vaccination, follow-up visits, deworming, weight,
grooming, and other actions. Medication administration can be marked scheduled,
given, late, skipped, or missed; a `given` action produces a timeline event.

### Weight and export

Weight is stored in kilograms and can be shown as history and a simple chart.
A selected health summary can be exported to PDF and shared through the native
share sheet.

## Navigation contract

- Home: pets, today's reminders, next medication, next visit, recent activity
- Timeline: events, date/category/pet filters, search
- Tambah: manual note, visit, medicine, vaccine, weight, scan/upload
- Documents: all documents and review state
- Settings: permissions, privacy, biometric lock, export, backup, app info

## Delivery order

1. Foundation
2. Pet profile
3. Timeline
4. Vet visits
5. Reminders and medication logging
6. Document storage
7. OCR review
8. PDF export
9. Optional cloud backup and sharing
10. Custom iOS integrations

## Current boundary

This session implements foundation only. All five routes are placeholders.
There is no `Pet` model, pet table, pet migration, pet form, pet list, edit
flow, or archive flow.
