import { useLanguage } from '@/i18n/LanguageContext';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SignaturePad from '../signature/SignaturePad';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step8Signature({ data, updateData }: Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step8.title')}</h2>
        <p className="text-sm text-muted-foreground">{t('step8.instruction')}</p>
      </div>

      <Alert>
        <AlertDescription className="text-sm leading-relaxed">
          {t('step8.consentText')}
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label>{t('step8.signHere')}</Label>
        <SignaturePad
          value={data.signatureData}
          onChange={(signature) => updateData({ signatureData: signature })}
        />
      </div>
    </div>
  );
}
