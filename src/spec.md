# Specification

## Summary
**Goal:** Fix the raw i18n key 'draft.resumeTitle' displaying in the UI by ensuring it is properly translated.

**Planned changes:**
- Wrap all instances of 'draft.resumeTitle' key with the translation function t() in the frontend components
- Verify and add the 'draft.resumeTitle' translation key in both en.ts and hi.ts files if missing

**User-visible outcome:** Users will see the properly translated text (e.g., "Resume Your Survey") instead of the raw key string 'draft.resumeTitle' in both English and Hindi languages.
