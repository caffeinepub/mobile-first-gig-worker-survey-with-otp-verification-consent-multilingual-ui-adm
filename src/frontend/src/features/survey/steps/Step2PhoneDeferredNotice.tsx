import { useLanguage } from '@/i18n/LanguageContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step2PhoneDeferredNotice({ data, updateData }: Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step2Deferred.title')}</h2>
        <p className="text-muted-foreground">{t('step2Deferred.subtitle')}</p>
      </div>

      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-600">
          {t('step2Deferred.notice')}
        </AlertDescription>
      </Alert>

      <div className="space-y-4 text-sm text-muted-foreground">
        <p>{t('step2Deferred.explanation')}</p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>{t('step2Deferred.benefit1')}</li>
          <li>{t('step2Deferred.benefit2')}</li>
          <li>{t('step2Deferred.benefit3')}</li>
        </ul>
      </div>
    </div>
  );
}
