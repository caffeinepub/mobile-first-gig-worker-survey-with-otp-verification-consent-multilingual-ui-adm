# Specification

## Summary
**Goal:** Restore the full list of Jharkhand local languages in the survey's language multi-select and add Bangla as a supported UI language in the app's language switcher.

**Planned changes:**
- Restore the preferred languages multi-select options in Step 3 (Basic Details) to include Santali, Mundari, Ho, Kurukh (Oraon), Nagpuri, Khortha, Kurmali, Panch Pargania, Hindi, English, and Bangla in `frontend/src/features/survey/options.ts`.
- Add Bangla (Bengali) as a selectable UI language in the LanguageSwitcher component.
- Add a Bangla translation file (`bn.ts`) under `frontend/src/i18n/translations/` mirroring the structure of `en.ts` and `hi.ts`.
- Update the translations index to export Bangla translations and include `'bn'` in the Language type.

**User-visible outcome:** Users can select all Jharkhand local languages plus Hindi, English, and Bangla in the survey's language preference field, and can also switch the entire app UI to Bangla via the language switcher.
