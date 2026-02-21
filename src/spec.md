# Specification

## Summary
**Goal:** Fix translation keys displaying as raw text in the survey wizard by properly wrapping them with the t() translation function.

**Planned changes:**
- Update ResumeDraftDialog.tsx to wrap 'draft.resumeTitle' and 'draft.resumeMessage' keys with t() function
- Review and fix all survey wizard components (Steps 1-9, SurveyWizard.tsx, ProgressIndicator.tsx) where translation keys appear as raw text instead of translated values
- Ensure t() function is properly imported and used for all user-facing text that should be localized

**User-visible outcome:** All text in the survey wizard displays properly translated content in the selected language (English or Hindi) instead of showing raw translation keys like 'draft.resumeTitle'.
