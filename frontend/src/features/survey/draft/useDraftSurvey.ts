import { useCallback } from 'react';
import type { SurveyData } from '../types';

const DRAFT_KEY = 'survey-draft';

export interface DraftData {
  step: number;
  data: SurveyData;
  timestamp: number;
}

export function useDraftSurvey() {
  const saveDraft = useCallback((draft: { step: number; data: SurveyData }) => {
    try {
      const draftData: DraftData = {
        step: draft.step,
        data: draft.data,
        timestamp: Date.now(),
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  }, []);

  const loadDraft = useCallback((): DraftData | null => {
    try {
      const stored = localStorage.getItem(DRAFT_KEY);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to load draft:', error);
      return null;
    }
  }, []);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      console.error('Failed to clear draft:', error);
    }
  }, []);

  const hasDraft = useCallback((): boolean => {
    try {
      return !!localStorage.getItem(DRAFT_KEY);
    } catch {
      return false;
    }
  }, []);

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    hasDraft,
  };
}
