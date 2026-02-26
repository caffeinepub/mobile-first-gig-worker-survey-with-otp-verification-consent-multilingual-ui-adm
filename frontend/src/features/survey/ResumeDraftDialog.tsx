import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useLanguage } from '@/i18n/LanguageContext';
import { useDraftSurvey, type DraftData } from './draft/useDraftSurvey';

interface ResumeDraftDialogProps {
  open: boolean;
  onResume: () => void;
  onStartOver: () => void;
}

export default function ResumeDraftDialog({ open, onResume, onStartOver }: ResumeDraftDialogProps) {
  const { t } = useLanguage();
  const { loadDraft } = useDraftSurvey();
  
  const draft: DraftData | null = loadDraft();
  
  const formatTimestamp = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return t('draft.justNow');
    if (minutes < 60) return t('draft.minutesAgo').replace('{{minutes}}', minutes.toString());
    if (hours < 24) return t('draft.hoursAgo').replace('{{hours}}', hours.toString());
    if (days < 7) return t('draft.daysAgo').replace('{{days}}', days.toString());
    
    return new Date(timestamp).toLocaleDateString();
  };
  
  const calculateProgress = (step: number): number => {
    return Math.round((step / 10) * 100);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('draft.resumeTitle')}</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>{t('draft.resumeMessage')}</p>
            {draft && (
              <div className="mt-4 space-y-1 text-sm">
                <p className="font-medium">
                  {t('draft.lastSaved').replace('{{timestamp}}', formatTimestamp(draft.timestamp))}
                </p>
                <p className="text-muted-foreground">
                  {t('draft.progressLabel')
                    .replace('{{step}}', draft.step.toString())
                    .replace('{{total}}', '10')
                    .replace('{{percentage}}', calculateProgress(draft.step).toString())}
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onStartOver}>{t('draft.startOverButton')}</AlertDialogCancel>
          <AlertDialogAction onClick={onResume}>{t('draft.resumeButton')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
