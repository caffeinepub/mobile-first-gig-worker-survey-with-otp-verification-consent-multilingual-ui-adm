import { en } from './en';
import { hi } from './hi';
import { bn } from './bn';

export const translations = {
  en,
  hi,
  bn,
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof en;
