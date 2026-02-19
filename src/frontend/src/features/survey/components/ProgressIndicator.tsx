import { useLanguage } from '@/i18n/LanguageContext';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const { t } = useLanguage();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">
          {currentStep > totalSteps ? t('review.title') : `${t('common.step')} ${currentStep} / ${totalSteps}`}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
