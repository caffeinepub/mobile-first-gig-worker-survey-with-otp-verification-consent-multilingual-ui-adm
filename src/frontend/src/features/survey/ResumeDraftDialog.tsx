import { useLanguage } from '@/i18n/LanguageContext';
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

interface ResumeDraftDialogProps {
  open: boolean;
  onResume: () => void;
  onStartOver: () => void;
}

export default function ResumeDraftDialog({ open, onResume, onStartOver }: ResumeDraftDialogProps) {
  const { t } = useLanguage();

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('draft.resumeTitle')}</AlertDialogTitle>
          <AlertDialogDescription>{t('draft.resumeMessage')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onStartOver}>
            {t('draft.startOverButton')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onResume}>
            {t('draft.resumeButton')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
